import { combineReducers } from 'redux';
import authReducer from './auth';
import orderReducer from './order';

const rootReduces = combineReducers({
  auth: authReducer,
  order: orderReducer,
});

export default rootReduces;
