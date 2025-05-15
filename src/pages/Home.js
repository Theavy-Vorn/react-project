// import React, { useEffect, useState } from 'react';
// import Card from '../components/Card';
// import Loading from '../components/Loading';
// import { Link } from 'react-router-dom';
// import { fetchCategories, fetchProduct } from '../services/productAction';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllProducts } from '../redux/actions/productActions';


// const Home = () => {
//     //declare variable
//     // const[count,setCount] = useState(0)
//     const dispatch = useDispatch()
//     const { products } = useSelector(state => state.proReducer);
//     const { categories } = useSelector(state => state.proReducer);
//     const { isLoading } = useSelector(state => state.proReducer)
//     // localstate
//     // const [products,setProduct] = useState([])
//     // const [isLoading , setLoading] = useState(true)
    
//     //use for track obj when component create update delete ...
//     useEffect(()=>{
//         // subscribe to store
//         dispatch(fetchAllProducts)
//         dispatch(fetchCategories)
//         //call to api
//         // fetchProduct()
//         // .then(res=>{
//         //     setLoading(false)
//         //     setProduct(res)
//         // })

//     })
//     return (
//         <div className='mx-auto px-5 justify-items-center'> 
//             <h1>Product</h1>
          
//             {/* <h1>You click {count} times</h1>
//              <button onClick={()=>setCount(count+1)}>Click me</button> */}
//             <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4 ">
//             {
//                 isLoading ? 
//                 <div className="flex gap-4">
//                     <Loading />
//                     <Loading />
//                 </div>
            
//                 :
//                 products.map((p)=>(
//                     <div key={p.id} className="col-span-2 md:col-span-2 lg:col-span-3">
//                     <Link to={`/read/${p.id}`}>
//                         <Card
//                         imageUrl={p.images[0]}
//                         title={p.title}
//                         // des={product.description}
//                         />
//                     </Link>
//                   </div>
//                 ))
            
//             }
//             </div>
//         </div>
//     );
// }

// export default Home;
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, fetchCategories } from '../redux/actions/productActions';
import Loading from '../components/Loading';

const Card = ({ imageUrl, title }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow">
      <img className="rounded-t-lg w-full h-48 object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h5 className="text-lg font-bold tracking-tight text-gray-900">{title}</h5>
      </div>
    </div>
  );
};

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector(state => state.proReducer);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className='mx-auto px-5 justify-items-center container'>
      <h1 className="text-2xl font-bold my-4">Product</h1>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-4">
        {isLoading ? (
          <div className="flex gap-4 col-span-full">
            <Loading />
            <Loading />
          </div>
        ) : (
          products.map((p) => (
            <div key={p.id} className="col-span-2 md:col-span-2 lg:col-span-3">
              <Link to={`/read/${p.id}`}>
                <Card
                  imageUrl={p.images?.[0] || 'https://via.placeholder.com/300'}
                  title={p.title}
                />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
