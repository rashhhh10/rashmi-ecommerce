import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        setLoading(true);
        try {
            await api.post(`/orders/${currentUser.id}/place`);
            alert("Order placed successfully!");
            navigate('/');
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Shipping Information</h3>
                <p className="text-gray-600">Mock Shipping Address...</p>
            </div>
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Payment Method</h3>
                <p className="text-gray-600">Mock Payment (Credit Card)</p>
            </div>
            <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-3 rounded text-lg font-bold hover:bg-indigo-700 disabled:opacity-50"
            >
                {loading ? 'Placing Order...' : 'Place Order'}
            </button>
        </div>
    );
};

export default Checkout;
