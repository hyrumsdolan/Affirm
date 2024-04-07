import { gql } from "@apollo/client";

export const GET_ME = gql`
  query Query {
    me {
      _id
      firstName
      email
      password
      pageProgress
      dream {
        _id
        bigDream
        littleDreams {
          _id
          littleDream
          selected
        }
        ultimateGoal
      }
      theme
    }
  }
`;
