import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../../constants';

const initialState = {
  item: null,
  loading: false,
  error: null,
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
    case UPDATE_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPDATE_ORDER_SUCCESS:

      return {
        ...state,
        loading: false,
        error: null,
        item: {
          ...state.item,
          state: action.payload.state,
          updatedAt: action.payload.updatedAt,
          freightInfo: {
            ...action.payload.freightInfo,
          },
        },
      };
    case UPDATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
