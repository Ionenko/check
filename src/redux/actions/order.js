import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../../constants';
import {
  COMPLETE_ORDER_INSPECTION_MUTATION,
  CONFIRM_ORDER_ITEM_MUTATION,
  CONFIRM_ORDER_RECEIVED_MUTATION,
  ORDER_QUERY,
  UPLOAD_ORDER_IMAGE_MUTATION,
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

const completeInspection = (client, {
  token, notes,
}) => (dispatch) => new Promise((resolve, reject) => {
  dispatch(updateOrderRequested());

  client.mutate({
    mutation: COMPLETE_ORDER_INSPECTION_MUTATION,
    variables: {
      token,
      notes,
    },
  }).then((res) => {
    dispatch(updateOrderLoaded(res.data.completeOrderInspection));
    resolve(res.data.completeOrderInspection);
  }).catch((err) => {
    dispatch(updateOrderError(err));
    reject(err);
  });
});

const confirmOrderItem = (client, {
  orderLineId, token, quantityReceived, packageDamaged, bolMismatch, notes, packageImages,
}) => (dispatch) => new Promise((resolve, reject) => {
  dispatch(updateOrderRequested());

  client.mutate({
    mutation: CONFIRM_ORDER_ITEM_MUTATION,
    variables: {
      orderLineId,
      token,
      quantityReceived,
      packageDamaged,
      bolMismatch,
      notes,
      packageImages,
    },
  }).then((res) => {
    dispatch(updateOrderLoaded(res.data.orderItemInspectionResult));
    resolve(res.data.orderItemInspectionResult);
  }).catch((err) => {
    dispatch(updateOrderError(err));
    reject(err);
  });
});

const uploadOrderImage = (client, file) => new Promise((resolve, reject) => {
  client.mutate({
    mutation: UPLOAD_ORDER_IMAGE_MUTATION,
    variables: {
      file,
    },
  }).then((res) => {
    resolve(res);
  }).catch((err) => {
    reject(err);
  });
});

export {
  fetchOrder,
  confirmOrder,
  completeInspection,
  confirmOrderItem,
  uploadOrderImage,
};
