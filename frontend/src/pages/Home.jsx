import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="text-center py-20 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-xl">
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Rashmi E-commerce</h1>
            <p className="text-xl mb-8">Your one-stop shop for everything you need. Premium quality, best prices.</p>
            <Link to="/products" className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300">
                Shop Now
            </Link>
        </div>
    );
};

export default Home;
