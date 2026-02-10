import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1); // 1: Address, 2: Payment
    const [address, setAddress] = useState({ street: '', city: '', zip: '' });
    const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' or 'upi'

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Simulate Payment Processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            await api.post(`/orders/${currentUser.id}/place`);
            alert("Payment Successful! Order placed.");
            navigate('/');
        } catch (error) {
            console.error("Error placing order", error);
            alert("Failed to place order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8 border-b pb-4">
                <span className={`font-bold ${step === 1 ? 'text-indigo-600' : 'text-gray-400'}`}>1. Shipping Address</span>
                <span className={`font-bold ${step === 2 ? 'text-indigo-600' : 'text-gray-400'}`}>2. Payment & Confirm</span>
            </div>

            {step === 1 && (
                <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-gray-700">Street Address</label>
                            <input required type="text" className="w-full border p-2 rounded"
                                value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700">City</label>
                                <input required type="text" className="w-full border p-2 rounded"
                                    value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-gray-700">Zip Code</label>
                                <input required type="text" className="w-full border p-2 rounded"
                                    value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} />
                            </div>
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded font-bold hover:bg-indigo-700">
                            Continue to Payment
                        </button>
                    </div>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handlePlaceOrder}>
                    <div className="mb-6">
                        <h3 className="text-lg font-bold mb-4">Select Payment Method</h3>
                        <div className="space-y-2">
                            <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                                <span>Credit/Debit Card</span>
                            </label>
                            <label className="flex items-center space-x-3 p-3 border rounded cursor-pointer hover:bg-gray-50">
                                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                                <span>UPI / Wallets</span>
                            </label>
                        </div>
                    </div>

                    {paymentMethod === 'card' && (
                        <div className="space-y-4 mb-6 bg-gray-50 p-4 rounded">
                            <input required type="text" placeholder="Card Number" className="w-full border p-2 rounded" />
                            <div className="grid grid-cols-2 gap-4">
                                <input required type="text" placeholder="MM/YY" className="w-full border p-2 rounded" />
                                <input required type="text" placeholder="CVV" className="w-full border p-2 rounded" />
                            </div>
                            <input required type="text" placeholder="Cardholder Name" className="w-full border p-2 rounded" />
                        </div>
                    )}

                    {paymentMethod === 'upi' && (
                        <div className="mb-6 bg-gray-50 p-4 rounded">
                            <input required type="text" placeholder="Enter UPI ID (e.g. user@oksbi)" className="w-full border p-2 rounded" />
                        </div>
                    )}

                    <div className="flex space-x-4">
                        <button type="button" onClick={() => setStep(1)} className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded font-bold hover:bg-gray-100">
                            Back
                        </button>
                        <button type="submit" disabled={loading} className="w-1/2 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 disabled:opacity-50">
                            {loading ? 'Processing...' : `Pay & Place Order`}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Checkout;
