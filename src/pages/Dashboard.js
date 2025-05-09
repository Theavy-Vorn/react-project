import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchProduct } from '../services/productAction';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [filterProduct, setProduct] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // Keep original list

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Photos',
            selector: row => <img src={row.images?.[0]} alt="product" style={{ width: '50px' }} />
        },
        {
            name: 'Action',
            selector: row => <button
                type='button'
                onClick={()=>navigate("/edit",{
                    state:row
                })}
                className='btn btn-primary'
            >Edit</button>
        },
    ];

    useEffect(() => {
        fetchProduct()
            .then(res => {
                setProduct(res);
                setAllProducts(res); // Save the original product list
            });
    }, []);

    useEffect(() => {
        const result = allProducts.filter(pro => {
            return pro.title && pro.title.toLowerCase().includes(search.toLowerCase());
        });
        setProduct(result);
    }, [search, allProducts]);

    return (
        <main className='container'>
            <DataTable
                columns={columns}
                data={filterProduct}
                pagination
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder='search here'
                        className="form-control"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }
            />
        </main>
    );
}
