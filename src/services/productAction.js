//fetch data from category server
import axios from 'axios';
import { base_URL } from '../utils/constant';

export const fetchCategories =async()=>{
    let res = await fetch(`${base_URL}categories`,{
        method:"GET"
    })
    return res.json()
}
export const fetchProduct = async()=>{
       let res = await fetch(`${base_URL}products`)
       return res.json()
       
    }
//Make : create function to insert product
export const insertProduct= async(product)=>{
    let res = await fetch(`${base_URL}products`,{
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(product)
    })
    return res
    
}
// make function to insert file such as import or pdf
export const fileUploadToServer = async(image)=>{
    let res = await axios({
        method:"POST",
        headers:{
            "Content-Type" : "multipart/form-data"
        },
        url:`${base_URL}files/upload`,
        data:image
    })
    return res.json()

}

//update product by product id
export const updateProduct = async (product,id) =>{
    let res = await fetch(`${base_URL}products/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(product)
    })
    return res;
}