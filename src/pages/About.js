import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '../services/productAction';
import { fetchAllProducts } from '../redux/actions/productActions';


export default function About(){
    const dispatch = useDispatch()
    const {products} = useSelector(state =>state.proReducer)
    useEffect(() =>{
        //subscribe to store
        dispatch(fetchAllProducts)
    },[])
    return(
        <main>
            <h2>
                About page
            </h2>
        </main>
    )
}
