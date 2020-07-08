import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            authorizationToken
            refreshToken
            userToken
        }
    }
`;

const useLogin = () => {
  const client = useApolloClient();

  return async ({ email, password }) => client.mutate({
    mutation: LOGIN_MUTATION,
    variables: {
      email,
      password,
    },
  });
};

const useLogout = () => {
  const client = useApolloClient();
  return async () => {
    await client.clearStore();
  };
};

export {
  useLogin,
  useLogout,
};
