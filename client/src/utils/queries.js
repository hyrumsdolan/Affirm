import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      firstName
      email
      password
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
      entries {
        _id
      }
    }
  }
`;