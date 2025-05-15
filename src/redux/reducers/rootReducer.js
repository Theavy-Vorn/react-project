// import { combineReducers } from "redux";
// import { productReducer } from "./productReducer";
// export const rootReducer = combineReducers ({
//     proReductcer : productReducer
// })
import { combineReducers } from 'redux';
import { productReducer } from './productReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
  proReducer: productReducer,
  authReducer:authReducer
});
