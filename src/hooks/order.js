import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ORDER_QUERY = gql`
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

const useOrderQuery = () => {
  const client = useApolloClient();

  return async (token) => client.query({
    query: ORDER_QUERY,
    variables: {
      token,
    },
  });
};

const CONFIRM_ORDER_RECEIVED_MUTATION = gql`
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

const useConfirmOrderReceived = () => {
  const client = useApolloClient();

  return async ({
    token, packageDamaged, bolImages, packageImages, notes,
  }) => client.mutate({
    mutation: CONFIRM_ORDER_RECEIVED_MUTATION,
    variables: {
      token,
      packageDamaged,
      bolImages,
      packageImages,
      notes,
    },
  });
};

const CONFIRM_ORDER_ITEM_MUTATION = gql`
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

const useOrderItemInspectionResult = () => {
  const client = useApolloClient();

  return async ({
    orderLineId, token, quantityReceived, notes, packageDamaged, bolMismatch, packageImages,
  }) => client.mutate({
    mutation: CONFIRM_ORDER_ITEM_MUTATION,
    variables: {
      orderLineId,
      token,
      quantityReceived,
      packageDamaged,
      bolMismatch,
      notes,
      packageImages,
    },
  });
};

const UPLOAD_ORDER_IMAGE_MUTATION = gql`
    mutation  uploadOrderImage($file: Upload!) {
        uploadOrderImage(file: $file) {
            id
            filename
            url
        }
    }
`;

const useUploadOrderImage = () => {
  const client = useApolloClient();

  return async (file) => client.mutate({
    mutation: UPLOAD_ORDER_IMAGE_MUTATION,
    variables: {
      file,
    },
  });
};

const COMPLETE_ORDER_INSPECTION_MUTATION = gql`
    mutation  completeOrderInspection($token: String!, $notes: String) {
        completeOrderInspection(token: $token, notes: $notes) {
            state
            updatedAt
            freightInfo
        }
    }
`;

const useCompleteInspection = () => {
  const client = useApolloClient();

  return async ({ token, notes }) => client.mutate({
    mutation: COMPLETE_ORDER_INSPECTION_MUTATION,
    variables: {
      token,
      notes,
    },
  });
};

export {
  useOrderQuery,
  useConfirmOrderReceived,
  useOrderItemInspectionResult,
  useUploadOrderImage,
  useCompleteInspection,
};
