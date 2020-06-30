import {FETCH_ORDER_FAILURE, FETCH_ORDER_REQUEST, FETCH_ORDER_SUCCESS, RECEIVE_ORDER} from "../../constants";
import orderApi from '../../api/order';

const orderLoaded = (item) => {
  return {
    type: FETCH_ORDER_SUCCESS,
    payload: item
  }
};

const orderRequested = () => {
  return {
    type : FETCH_ORDER_REQUEST
  }
};

const orderError = (error) => {
  return {
    type: FETCH_ORDER_FAILURE,
    payload: error
  }
};

export const fetchOrder = (id) => async (dispatch) => {
  dispatch(orderRequested());
  try {
    const data = await orderApi.getOrder(id);
    console.log(data);
    dispatch(orderLoaded(data));
  } catch (error) {
    dispatch(orderError(error))
  }
};

export const receiveOrder = (data) => ({
  type: RECEIVE_ORDER,
  payload: data
});