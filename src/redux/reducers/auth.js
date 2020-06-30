import {
  AUTH_LOGOUT,
  AUTH_SUCCESS,
} from "../../constants";


const initialState = {
  isLoggedIn: false,
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.token
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        token: null
      };
    default:
      return state;
  }
};

export default authReducer;