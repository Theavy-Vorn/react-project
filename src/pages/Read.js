import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Read = () => {
    //useParams used get id
    let param = useParams()
    let {id} = useParams()
    const [product ,setProduct] = useState({
        //default image
        title:"default title",
        des:"defaault des",
        images:[
            "https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg"
        ]
    })
    let fetchDetailProduct = (id)=>{
        fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
        .then(res=>res.json())
        .then(res=>setProduct(res))
    }

    useEffect(()=>{
        fetchDetailProduct(id)
    })
    return (
        <div>
           {
             console.log(param)
           }
            <h1>Read page{id}</h1>
            <h1>{product.title}</h1>
            <h1>{product.description }</h1>
            <img src={product.images[0]} />
        </div>
    );
}

export default Read;
