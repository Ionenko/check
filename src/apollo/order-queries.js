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

export const CONFIRM_ORDER_RECEIVED_MUTATION = gql`
    mutation  confirmOrderReceived(
        $token: String!,
        $packageDamaged: Boolean!,
        $bolImages: [ID!],
        $packageImages: [ID!],
        $notes: String ) {
        confirmOrderReceived(
            token: $token,
            packageDamaged: $packageDamaged,
            bolImages: $bolImages,
            packageImages: $packageImages,
            notes: $notes
        ) {
            state
            updatedAt
            freightInfo
        }
    }
`;
