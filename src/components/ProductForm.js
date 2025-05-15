import React, { useEffect, useState } from 'react'
import { fetchCategories, fileUploadToServer, insertProduct, updateProduct } from '../services/productAction'
import { useLocation } from 'react-router-dom'
export default function ProductForm({edit}){

    //get data from navigation
    const location = useLocation()

    const[categories,setCategories] = useState([])
    const[source,setSource] = useState()
    const [product,setProduct] = useState({
        id:0,
        title:"",
        price:0,
        description:"",
        categoryId:"",
        images:[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9cSGzVkaZvJD5722MU5A-JJt_T5JMZzotcw&s"
        ]
    })
    const onChangeHandler = (e) =>{
       const {name , value} = e.target
       console.log(name)
       console.log(value)
       setProduct(prevState =>{
        return{
            //copy
            ...prevState,
            // insert new state
            [name]: value
        }
       })
       console.log(product);
    }

    const onPreviewImage =(e)=>{
        console.log(e.target.files)
        setSource(e.target.files[0])
    }

    useEffect(() => {
        console.log(edit);
        if (edit && location.state) {
          console.log(location.state);
          const { id, title, price, description, category, images } = location.state;
      
          setProduct({
            id,
            title,
            price,
            description,
            categoryId: category.id,
            images,
          });
        }
      
        fetchCategories().then(res => setCategories(res));
      }, []);
      

    const handleOnSubmit=()=>{
       

        // check condition whether create or update product
        if(edit){
            // soure is equal to "" , it mean that user updatew with old image
            if(source == ""){
                console.log('product id when edit ', product.id)
                updateProduct(product,product.id)
                .then(res => res.json())
                .then(res => console.log(res))
            }else{
            // user brower new image
                const image = new FormData()
                image.append("file",source)
                fileUploadToServer(image)
                .then(res => {
                product.images=[res.data.location]
                updateProduct(product,product.id)
                .then(res => res.json())
                .then(res => console.log(res))
               }) 
            }
        }
        else{
      // create image obj as form data
            console.log("success");
            const formData = new FormData()
            formData.append("file",source)
            //function to upload image data to server
            fileUploadToServer(formData)
            .then(res =>{
            product.images=[res.data.location]
            console.log(product.images);
            // insert product including image
            insertProduct(product) 
            .then(res.res.json)
            .then(res=>console.log(res))
    
            })
        }
    }
    return(
        <main >
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label
                       
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Title
                    </label>
                    <input
                        value={product.title}
                        type="text"
                        id="title"
                        name="title"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="please input title"
                        required=""
                        onChange={onChangeHandler}
                    />
                </div>
                <div className="mb-5">
                    <label
                      
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Price:
                    </label>
                    <input
                        value={product.price}
                        name="price"
                        type="price"
                        id="price"
                        placeholder="300$"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        onChange={onChangeHandler}
                    />
                </div>
               
                <label
                   
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Choose Category
                </label>
                <select
                    value={product.categoryId}
                    name="categoryId"
                    id="category"
                    className="mb-5 ..."
                    onChange={onChangeHandler}
                    >

                {/* <select
                    value={product.categoryId}
                    name="categoryId"
                    id="category"
                    defaultValue="" 
                    className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChangeHandler}
                > */}
                    <option value="" disabled>Choose a category</option> 
                    {
                        categories && categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))
                    }
                </select>

                <div className="mb-5">
                    <label
                       
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                        Description:
                    </label>
                    <textarea
                        value={product.description}
                        type="des"
                        id="des"
                        placeholder="please input description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        name="description"
                        onChange={onChangeHandler}
                    />
                    <div className='mt-5'>
                        <img 
                        src={source instanceof File ? URL.createObjectURL(source) : product.images[0]} 
                        alt='Priview Image' style={{width:'150px'}} />
                    </div>
                    <div className='mt-5'>
                    <input 
                        
                        type="file"
                        id="photo"
                        name="photo"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="please input title"
                        required=""
                        onChange={ onPreviewImage}
                    />
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={()=>handleOnSubmit()}
                >
                    {edit ? "Update Product" : "Create Product"}
                </button>
            </form>

        </main>
    )
}