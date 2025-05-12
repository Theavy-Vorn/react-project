// import { combineReducers } from "redux";
// import { productReducer } from "./productReducer";
// export const rootReducer = combineReducers ({
//     proReductcer : productReducer
// })
import { combineReducers } from 'redux';
import { productReducer } from './productReducer';

export const rootReducer = combineReducers({
  proReducer: productReducer
});
