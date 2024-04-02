import { gql } from '@apollo/client';

export const GET_ME = gql`
    query Me {
        me {
            _id
            firstName
            lastName
            email
            password
            entries {
                _id
                date
            }
        }
    }
`;