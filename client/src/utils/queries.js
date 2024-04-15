import { gql } from "@apollo/client";
// getting null  on ten-year-dream-page works on appolo server
export const GET_ME = gql`
query Me {
  me {
      _id
      firstName
      email
      pageProgress
      clauderesponses {
        body
        claudeId
      }
      theme
    }
  }
`;
