import { actionTypes } from "./actionType"
import { base_URL } from "../../utils/constant"

export const fetchAllProducts = () =>{
    return (dispatch)=>{
        fetch(`${base_URL}products`)
        .then(res =>res.json())
        .then(res => dispatch({
            type: actionTypes.FETCH_PRODUCTS,
            payload:res
        }))

        .catch(err=>console.log('fetch product err :',err))
    }
   
    
}