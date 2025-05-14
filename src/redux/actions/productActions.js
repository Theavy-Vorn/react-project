// import { actionTypes } from "./actionType"
// import { base_URL } from "../../utils/constant"

// export const fetchAllProducts = () =>{
//     return (dispatch)=>{
//         fetch(`${base_URL}products`)
//         .then(res =>res.json())
//         .then(res => dispatch({
//             type: actionTypes.FETCH_PRODUCTS,
//             payload:res
//         }))

//         .catch(err=>console.log('fetch product err :',err))
//     }
    
// }
// export const fetchCategories =()=>{
//     return(dispatch) =>{    
//         fetch(`${base_URL}categories`)
//         .then(res => res.json())
//         .then(res =>dispatch({
//             type: actionTypes.FETCH_CATEGORIES,
//             payload:res
//         }))
//         .catch(err=>console.log('fetch categories err :',err))
//     }
// }                                                                                                                                                                                                                                                                                                                
// productActions.js
// productActions.js
import { actionTypes } from './actionType';
import { base_URL } from '../../utils/constant';

export const fetchAllProducts = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${base_URL}products`);
      const data = await res.json();

      dispatch({
        type: actionTypes.FETCH_PRODUCTS,
        payload: data,
      });
    } catch (err) {
      console.error('fetch products error:', err);
    }
  };
};

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(`${base_URL}categories`);
      const data = await res.json();

      dispatch({
        type: actionTypes.FETCH_CATEGORIES,
        payload: data,
      });
    } catch (err) {
      console.error('fetch categories error:', err);
    }
  };
};
