import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchProduct } from '../services/productAction';



export default function Dashboard(){
    const [product,setProduct] = useState([])
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable:true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable:true

        },
        {
            name: 'Photos',
            selector: row => <img src={row.images[0]} alt="prodict" style={{width:'50px'}}/>,
        },
        {
            name: 'Action',
            selector: row => <button>Edit</button>
        },
    ];
    
    const data = [
          {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]

    useEffect(()=>{
        fetchProduct()
        .then(res => setProduct(res))
    },[])

    return(
        <>
        
        <main className='container'>
            <DataTable 
                columns={columns}
                data={product}
                pagination
            />
        </main>
        </>
    )
}
