import React, { useEffect, useState } from 'react'
import { fetchCategories, fileUploadToServer, insertProduct } from '../services/productAction'
export default function ProductForm(){
    const[categories,setCategories] = useState([])
    const[source,setSource] = useState()
    const [product,setProduct] = useState({
        title:"",
        price:0,
        description:"",
        categoryId:1,
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

    useEffect(()=>{
        fetchCategories()
        .then(res =>setCategories(res))
    },[])

    const handleOnSubmit=()=>{
        //create image obj as form data
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
    return(
        <main>
            <form className="max-w-sm mx-auto">
                <div className="mb-5">
                    <label
                       
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                    Title
                    </label>
                    <input
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
                    name="categoryId"
                    id="category"
                    defaultValue="" 
                    className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={onChangeHandler}
                >
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
                        type="des"
                        id="des"
                        placeholder="please input description"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        name="description"
                        onChange={onChangeHandler}
                    />
                    <div className='mt-5'>
                        <img src={source && URL.createObjectURL(source)} alt='Priview Image' style={{width:'150px'}} />
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
                    Create Product
                </button>
            </form>

        </main>
    )
}