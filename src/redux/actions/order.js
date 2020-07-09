import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../../constants';
import {ORDER_QUERY} from "../../apollo/order-queries";

export const orderLoaded = (order) => ({
  type: FETCH_ORDER_SUCCESS,
  payload: order,
});

export const orderRequested = () => ({
  type: FETCH_ORDER_REQUEST,
});

export const orderError = (error) => ({
  type: FETCH_ORDER_FAILURE,
  payload: error,
});

export const updateRequested = () => ({
  type: UPDATE_ORDER_REQUEST,
});

export const updateLoaded = (data) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: data,
});

export const updateError = (error) => ({
  type: UPDATE_ORDER_ERROR,
  payload: error,
});

const fetchOrder = (client, token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(orderRequested());

    client.query({
      query: ORDER_QUERY,
      variables: {
        token,
      },
    }).then((res) => {
      dispatch(orderLoaded(res.data.orderForInspection));
      resolve(res.data.orderForInspection);
    }).catch((err) => {
      dispatch(orderError(err));
      reject(err);
    });
  });
};

export {
  fetchOrder,
};
