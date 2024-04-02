import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        loginUser(email: $email, password: $password) {
            token
            user {
                _id
                email
                password
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
        addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
            token
            user {
                _id
                firstName
                lastName
                email
                password
            }
        }
    }
`;
