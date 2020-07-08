import { AUTH_SUCCESS, AUTH_LOGOUT } from '../../constants';

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

const authLogout = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_token');
  localStorage.removeItem('refresh_token');

  return {
    type: AUTH_LOGOUT,
  };
};

export {
  authSuccess,
  authLogout,
};
