import { actionTypes } from "../actions/actionType"

// const initialState = {
//     products:[]
// }
// export const productReducer = (state = initialState , action)=>{
//     const {type,payload} = action
//     switch(type){
//         case actionTypes.FETCH_PRODUCTS:
//             //statement
//             return{...state,products:payload}
//             default:
//                 return state
//     }
// }
// productReducer.js

const initialState = {
  products: [],
  categories: [],
  isLoading: true,
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case actionTypes.FETCH_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};
