import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        fetchWishlist();
    }, [currentUser]);

    const fetchWishlist = async () => {
        try {
            const response = await api.get(`/wishlist/${currentUser.id}`);
            setWishlist(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching wishlist", error);
            setLoading(false);
        }
    };

    const removeFromWishlist = async (productId) => {
        try {
            await api.delete(`/wishlist/${currentUser.id}/remove/${productId}`);
            fetchWishlist();
        } catch (error) {
            console.error("Error removing from wishlist", error);
        }
    };

    const addToCart = async (productId) => {
        try {
            await api.post(`/cart/${currentUser.id}/add?productId=${productId}&quantity=1`);
            alert("Added to cart!");
            removeFromWishlist(productId); // Optional: remove from wishlist after adding to cart
        } catch (error) {
            console.error("Error adding to cart", error);
        }
    };

    if (loading) return <div className="text-center py-10">Loading wishlist...</div>;

    if (!wishlist || wishlist.items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
                <Link to="/products" className="text-indigo-600 hover:text-indigo-800">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.items.map(item => (
                    <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                        <img src={item.product.imageUrl || 'https://via.placeholder.com/300'} alt={item.product.name} className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold mb-2">{item.product.name}</h3>
                            <p className="text-indigo-600 font-bold mb-4">${item.product.price}</p>
                            <div className="flex justify-between space-x-2">
                                <button
                                    onClick={() => addToCart(item.product.id)}
                                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
                                >
                                    Add to Cart
                                </button>
                                <button
                                    onClick={() => removeFromWishlist(item.product.id)}
                                    className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600 text-sm"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
