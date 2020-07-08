import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
} from '../../constants';

const initialState = {
  authorizationToken: null,
  refreshToken: null,
  userToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        authorizationToken: null,
        refreshToken: null,
        userToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
