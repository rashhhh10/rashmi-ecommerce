import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const response = await api.get(`/products/${id}`);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching product", error);
            setLoading(false);
        }
    };

    const addToCart = async () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        try {
            // Assuming user ID is available in currentUser object, usually it is.
            // Adjust based on your actual Auth response structure.
            await api.post(`/cart/${currentUser.id}/add?productId=${product.id}&quantity=${quantity}`);
            alert("Added to cart!");
        } catch (error) {
            console.error("Error adding to cart", error);
            alert("Failed to add to cart");
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (!product) return <div className="text-center py-10">Product not found</div>;

    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden md:flex">
            <div className="md:w-1/2">
                <img src={product.imageUrl || 'https://via.placeholder.com/600'} alt={product.name} className="w-full h-96 object-cover" />
            </div>
            <div className="p-8 md:w-1/2">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
                <div className="text-3xl font-bold text-indigo-600 mb-6">${product.price}</div>

                <div className="flex items-center mb-6">
                    <label className="mr-4 font-bold text-gray-700">Quantity:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="border rounded w-20 px-3 py-2 text-center"
                    />
                </div>

                <div className="flex space-x-4">
                    <button
                        onClick={addToCart}
                        className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-indigo-700 transition duration-300"
                    >
                        Add to Cart
                    </button>
                    {/* Wishlist button could go here */}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
