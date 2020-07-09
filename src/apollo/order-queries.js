import gql from 'graphql-tag';

export const ORDER_QUERY = gql`
    query orderForInspection($token: String!) {
        orderForInspection(token: $token) {
            id
            state
            createdAt
            updatedAt
            token
            freightInfo
            orderLines {
                id
                quantity
                productVariant
            }
        }
    }
`;
