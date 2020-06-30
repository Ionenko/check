import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS, RECEIVE_ORDER
} from "../../constants";


const initialState = {
  item: null,
  loading: false,
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_REQUEST:
      return {
        ...state,
        item: null,
        loading: true,
        error: null,
      };
    case FETCH_ORDER_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_ORDER_FAILURE:
      return {
        ...state,
        item: null,
        loading: false,
        error: action.payload,
      };
    case RECEIVE_ORDER:
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload
        },
      };
    default:
      return state;
  }
};

export default orderReducer;