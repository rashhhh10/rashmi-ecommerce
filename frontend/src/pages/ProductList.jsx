import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products", error);
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await api.get(`/products/search?query=${searchTerm}`);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error searching products", error);
            setLoading(false);
        }
    }

    if (loading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
                <form onSubmit={handleSearch} className="flex">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="border rounded-l px-4 py-2 focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r hover:bg-indigo-700">Search</button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                        <img src={product.imageUrl || 'https://via.placeholder.com/300'} alt={product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                            <p className="text-gray-600 mb-2 truncate">{product.description}</p>
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-indigo-600 font-bold text-lg">${product.price}</span>
                                <Link to={`/products/${product.id}`} className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700">
                                    View Details
                                </Link>
                                <button className="text-red-500 hover:text-red-700 ml-2" title="Add to Wishlist"
                                    onClick={async () => {
                                        const user = JSON.parse(localStorage.getItem('user'));
                                        if (!user) return alert("Please login first");
                                        try {
                                            await api.post(`/wishlist/${user.id}/add?productId=${product.id}`);
                                            alert("Added to Wishlist!");
                                        } catch (e) { console.error(e); }
                                    }}
                                >
                                    ❤️
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
