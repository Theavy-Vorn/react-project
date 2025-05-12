// import { actionTypes } from "../actions/actionType"

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
const initialState = {
  products: []
};

export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};
