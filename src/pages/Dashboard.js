import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { fetchProduct } from '../services/productAction';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    // States
    const [search, setSearch] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    // DataTable Columns
    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => `$${row.price}`,
            sortable: true,
        },
        {
            name: 'Photo',
            cell: row => (
                <img
                    src={row.images?.[0]}
                    alt="product"
                    style={{ width: '50px', objectFit: 'cover' }}
                />
            ),
        },
        {
            name: 'Action',
            cell: row => (
                
                <div>
                    <button
                        type="button"
                        onClick={() => navigate('/edit', { state: row })}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 "
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/edit', { state: row })}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 m-4"
                    >
                        Delete
                    </button>
                </div>
                
            ),
        },
    ];

    // Fetch products on load
    useEffect(() => {
        fetchProduct().then(res => {
            setAllProducts(res);
            setFilteredProducts(res);
        });
    }, []);

    // Filter logic based on search
    useEffect(() => {
        const result = allProducts.filter(product =>
            product.title?.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(result);
    }, [search, allProducts]);

    return (
        <main className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

            <DataTable
                title="Product List"
                columns={columns}
                data={filteredProducts}
                pagination
                highlightOnHover
                subHeader
                subHeaderComponent={
                    <input
                        type="text"
                        placeholder="Search by title..."
                        className="form-control w-full max-w-md"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                }
            />
        </main>
    );
}
