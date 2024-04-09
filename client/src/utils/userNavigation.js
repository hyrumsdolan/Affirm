import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ME } from "./queries";

const useUserNavigation = () => {
  const navigate = useNavigate();
  const { refetch } = useQuery(GET_ME, {
    skip: true
  });

  const handleMutationCompleted = async () => {
    try {
      const { data } = await refetch();
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
    } catch (error) {
      console.error("Error refetching GET_ME query:", error);
    }
  };

  return handleMutationCompleted;
};

export default useUserNavigation;
