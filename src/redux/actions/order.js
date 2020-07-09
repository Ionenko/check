import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../../constants';
import {
  CONFIRM_ORDER_RECEIVED_MUTATION,
  ORDER_QUERY,
} from '../../apollo/order-queries';

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

export const updateOrderRequested = () => ({
  type: UPDATE_ORDER_REQUEST,
});

export const updateOrderLoaded = (data) => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: data,
});

export const updateOrderError = (error) => ({
  type: UPDATE_ORDER_ERROR,
  payload: error,
});

const fetchOrder = (client, token) => (dispatch) => new Promise((resolve, reject) => {
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

const confirmOrder = (client, {
  token, packageDamaged, bolImages, packageImages, notes,
}) => (dispatch) => new Promise((resolve, reject) => {
  dispatch(updateOrderRequested());

  client.mutate({
    mutation: CONFIRM_ORDER_RECEIVED_MUTATION,
    variables: {
      token,
      packageDamaged,
      bolImages,
      packageImages,
      notes,
    },
  }).then((res) => {
    dispatch(updateOrderLoaded(res.data.confirmOrderReceived));
    resolve(res.data.confirmOrderReceived);
  }).catch((err) => {
    dispatch(updateOrderError(err));
    reject(err);
  });
});

export {
  fetchOrder,
  confirmOrder,
};
