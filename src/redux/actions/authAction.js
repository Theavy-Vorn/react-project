import axios from "axios"
import { base_URL } from "../../utils/constant"
import { actionTypes } from "./actionType"
import { type } from "@testing-library/user-event/dist/type"
import SecureLS from 'secure-ls';

const secureLocalStorage = new SecureLS({ encodingType: 'aes' });

export const loginUser =(user) =>{
    return(dispatch) =>{
        axios(`${base_URL}auth/login`,{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            data:JSON.stringify(user)
        })
        .then(res => {
            if(res.status==201){
                // secureLocalStorage.setItem('auth',res)
                dispatch({
                    type:actionTypes.LOGIN,
                    payload:res
       
                })
                return Promise.resolve()
            }
        })
       return Promise.resolve()
    }
}

export const logout = () =>{
    return(dispatch)=>{
        secureLocalStorage.removeItem("auth")
        dispatch({
            type:actionTypes.LOGOUT,
            payload:null
        })
        return Promise.resolve()
    }
}