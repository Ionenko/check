import {
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_REQUEST,
  AUTH_SUCCESS,
} from '../../constants';

const initialState = {
  authorizationToken: null,
  refreshToken: null,
  userToken: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
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
