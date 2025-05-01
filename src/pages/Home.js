import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../services/productAction';

const Home = () => {
    //declare variable
    // const[count,setCount] = useState(0)
    const [products,setProduct] = useState([])
    const [isLoading , setLoading] = useState(true)
    
    //use for track obj when component create update delete ...
    useEffect(()=>{
        //call to api
        fetchProduct()
        .then(res=>{
            setLoading(false)
            setProduct(res)
        })

    })
    return (
        <div className='mx-auto px-5 justify-items-center'> 
            {/* <h1>You click {count} times</h1>
             <button onClick={()=>setCount(count+1)}>Click me</button> */}
            <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4 ">
            {
                isLoading ? 
                <div className="flex gap-4">
                    <Loading />
                    <Loading />
                </div>
            
                :
                products.map((p)=>(
                    <div key={p.id} className="col-span-2 md:col-span-2 lg:col-span-3">
                    <Link to={`/read/${p.id}`}>
                        <Card
                        imageUrl={p.images[0]}
                        title={p.title}
                        // des={product.description}
                        />
                    </Link>
                  </div>
                ))
            
            }
            </div>
        </div>
    );
}

export default Home;
