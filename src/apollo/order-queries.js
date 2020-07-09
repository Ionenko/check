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

export const COMPLETE_ORDER_INSPECTION_MUTATION = gql`
    mutation  completeOrderInspection($token: String!, $notes: String) {
        completeOrderInspection(token: $token, notes: $notes) {
            state
            updatedAt
            freightInfo
        }
    }
`;

export const CONFIRM_ORDER_ITEM_MUTATION = gql`
    mutation  orderItemInspectionResult(
        $token: String!,
        $orderLineId: ID!
        $quantityReceived: Int!
        $packageDamaged: Boolean!,
        $bolMismatch: Boolean!,
        $packageImages: [ID!]
        $notes: String
    ) {
        orderItemInspectionResult(
            orderLineId: $orderLineId,
            token: $token,
            quantityReceived: $quantityReceived,
            packageDamaged: $packageDamaged,
            bolMismatch: $bolMismatch,
            notes: $notes
            packageImages: $packageImages,
        ) {
            state
            updatedAt
            freightInfo
        }
    }
`;

export const UPLOAD_ORDER_IMAGE_MUTATION = gql`
    mutation  uploadOrderImage($file: Upload!) {
        uploadOrderImage(file: $file) {
            id
            filename
            url
        }
    }
`;
