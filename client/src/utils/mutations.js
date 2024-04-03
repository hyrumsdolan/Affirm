import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
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
  mutation createEntry($title: String!, $content: String!) {
    createEntry(title: $title, content: $content) {
      _id
      title
      content
      createdAt
      updatedAt
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
    callClaude(input: $input)
  }
`;