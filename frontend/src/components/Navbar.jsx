import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-indigo-600">Rashmi</Link>
                <div className="flex items-center space-x-6">
                    <Link to="/products" className="text-gray-600 hover:text-indigo-600">Products</Link>

                    {currentUser && (
                        <Link to="/cart" className="text-gray-600 hover:text-indigo-600 flex items-center">
                            <FaShoppingCart className="mr-1" /> Cart
                        </Link>
                    )}

                    {currentUser ? (
                        <div className="flex items-center space-x-4">
                            {currentUser.roles.includes('ROLE_ADMIN') && (
                                <Link to="/admin" className="text-gray-600 hover:text-indigo-600">Admin</Link>
                            )}
                            <span className="text-gray-800 font-medium flex items-center">
                                <FaUser className="mr-1" /> {currentUser.username}
                            </span>
                            <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
                            <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
