import {
  FETCH_ORDER_FAILURE,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  UPDATE_ORDER_ERROR,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
} from '../../constants';

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
