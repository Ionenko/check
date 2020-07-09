import gql from 'graphql-tag';

export const CURRENT_USER_QUERY = gql`
    query currentUser {
        id
        name
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            authorizationToken
            refreshToken
            userToken
        }
    }
`;
