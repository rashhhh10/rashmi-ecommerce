import React, { useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        fetchCart();
    }, [currentUser]);

    const fetchCart = async () => {
        try {
            const response = await api.get(`/cart/${currentUser.id}`);
            setCart(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart", error);
            setLoading(false);
        }
    };

    const removeItem = async (productId) => {
        try {
            await api.delete(`/cart/${currentUser.id}/remove/${productId}`);
            fetchCart();
        } catch (error) {
            console.error("Error removing item", error);
        }
    };

    const clearCart = async () => {
        try {
            await api.delete(`/cart/${currentUser.id}/clear`);
            fetchCart();
        } catch (error) {
            console.error("Error clearing cart", error);
        }
    };

    if (loading) return <div className="text-center py-10">Loading cart...</div>;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                <Link to="/products" className="text-indigo-600 hover:text-indigo-800">Start Shopping</Link>
            </div>
        );
    }

    const total = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <table className="w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cart.items.map(item => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.product.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.product.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.product.price * item.quantity).toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <button onClick={() => removeItem(item.product.id)} className="text-red-600 hover:text-red-900">Remove</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center bg-white p-6 rounded-lg shadow-md">
                <div className="text-2xl font-bold">Total: ${total.toFixed(2)}</div>
                <div className="space-x-4">
                    <button onClick={clearCart} className="text-gray-600 hover:text-gray-800">Clear Cart</button>
                    <Link to="/checkout" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 font-bold">
                        Proceed to Checkout
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
