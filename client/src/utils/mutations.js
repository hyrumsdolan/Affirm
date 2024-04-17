import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        firstName
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        email
      }
    }
  }
`;

export const CREATE_ENTRY = gql`
mutation createEntry($gratefulFor: [String!]!, $dailyAffirmations: [String!]!, $ultimateAffirmation: String!) {
  createEntry(gratefulFor: $gratefulFor, dailyAffirmations: $dailyAffirmations, ultimateAffirmation: $ultimateAffirmation) {
    _id
    gratefulFor
    dailyAffirmations
    ultimateAffirmation
    createdAt
  }
}
`;

export const UPDATE_ENTRY = gql`
  mutation updateEntry($_id: ID!, $title: String, $content: String) {
    updateEntry(_id: $_id, title: $title, content: $content) {
      _id
      title
      content
      updatedAt
    }
  }
`;

export const DELETE_ENTRY = gql`
  mutation deleteEntry($_id: ID!) {
    deleteEntry(_id: $_id) {
      _id
    }
  }
`;

export const CALL_CLAUDE = gql`
  mutation callClaude($input: String!) {
    callClaude(input: $input){
      user {
        clauderesponses {
          body
          claudeId
        }
      }
    }
  }
`;

export const ADD_BIG_DREAM = gql`
  mutation AddBigDream($bigDream: String!) {
    addBigDream(bigDream: $bigDream) {
      _id
      bigDream
    }
  }
`;

export const ADD_LITTLE_DREAMS = gql`
  mutation AddLittleDreams($littleDreams: [String!]!) {
    addLittleDreams(littleDreams: $littleDreams) {
      _id
      littleDream
    }
  }
`;

export const ADD_ULTIMATE_GOAL = gql`
  mutation AddUltimateGoal($ultimateGoal: String!) {
    addUltimateGoal(ultimateGoal: $ultimateGoal) {
      _id
      ultimateGoal
    }
  }
`;
