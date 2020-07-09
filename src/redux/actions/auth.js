import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_ERROR,
} from '../../constants';
import {LOGIN_MUTATION} from '../../apollo/auth-queries';

const authRequest = () => {
  return {
    type: AUTH_REQUEST,
  };
};

const authError = (err) => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_token');
  localStorage.removeItem('refresh_token');
  return {
    type: AUTH_ERROR,
    payload: err,
  };
};

const authSuccess = (data) => {
  const {
    authorizationToken,
    refreshToken,
    userToken,
  } = data;

  localStorage.setItem('auth_token', authorizationToken);
  localStorage.setItem('user_token', userToken);
  localStorage.setItem('refresh_token', refreshToken);

  return {
    type: AUTH_SUCCESS,
    payload: data,
  };
};

const authLogin = (client, { email, password }) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(authRequest());
    client.mutate({
      mutation: LOGIN_MUTATION,
      variables: {
        email,
        password,
      },
    }).then((res) => {
      dispatch(authSuccess(res.data.login));
      resolve(res.data.login);
    }).catch((err) => {
      dispatch(authError(err));
      reject(err);
    });
  });
};

const authLogout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_token');
  localStorage.removeItem('refresh_token');

  return {
    type: AUTH_LOGOUT,
  };
};

export {
  authLogin,
  authSuccess,
};
