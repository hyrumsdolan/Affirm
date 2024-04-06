import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import AuthService from '../utils/auth';
import { GET_ME } from '../utils/queries';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();
  const isAuthenticated = AuthService.loggedIn();

  const { loading, error, data } = useQuery(GET_ME, {
    context: {
      headers: {
        authorization: isAuthenticated ? `Bearer ${AuthService.getToken()}` : '',
      },
    },
  });

  // useEffect(() => { // Database needs to be fixed before this can work. Resolvers need to be able to actually add user data.
  //   if (!loading && !error && data && data.me) {
  //     console.log(data.me);
  //     if (!data.me.dream) {
  //       navigate('/ten-year-dream');
  //     } else if (!data.me.dream.littleDreams.length) {
  //       navigate('/and-next');
  //     } else if (!data.me.dream.ultimateGoal) {
  //       navigate('/one-goal');
  //     } else {
  //       navigate('/welcome-back');
  //     }
  //   }
  // }, [loading, error, data, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    // Handle the error state
    return <div>Error occurred</div>;
  }

  return isAuthenticated ? (
    <Component {...rest} user={data?.me} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;