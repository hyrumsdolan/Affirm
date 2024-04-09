import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import AuthService from "../utils/auth";
import { GET_ME } from "../utils/queries";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = AuthService.loggedIn();
  console.log("isAuthenticated", isAuthenticated);

  const { loading, error, data } = useQuery(GET_ME, {
    skip: !isAuthenticated,
    context: {
      headers: {
        authorization: isAuthenticated ? `Bearer ${AuthService.getToken()}` : ""
      }
    },
    onCompleted: data => {
      const userData = data.me;
      const bigDream = userData.dream?.bigDream;
      const littleDreams = userData.dream?.littleDreams;
      const ultimateGoal = userData.dream?.ultimateGoal;

      if (!bigDream) {
        navigate("/ten-year-dream");
      } else if (!littleDreams || littleDreams.length < 1) {
        navigate("/and-next");
      } else if (!ultimateGoal) {
        navigate("/one-goal");
      } else {
        navigate("/welcome-back");
      }
    }
  });

  console.log(`PrivateRoute data: ${JSON.stringify(data)}`); // Add this line

  useEffect(() => {
    if (loading || error || !data?.me) {
      return;
    }
  }, [loading, error, data]);

  if (location.pathname === "/" || location.pathname === "/signup") {
    return <Component {...rest} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error occurred</div>;
  }

  return <Component {...rest} user={data?.me} />;
};

export default PrivateRoute;
