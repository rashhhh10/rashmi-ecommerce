import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="font-sans">
            {/* Hero Section */}
            <div className="relative bg-gray-900 text-white overflow-hidden rounded-2xl shadow-2xl mb-12">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 py-32 flex flex-col justify-center items-center text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        Elevate Your Style
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl">
                        Discover the latest trends in fashion and accessories. curated just for you. Quality meets elegance.
                    </p>
                    <Link to="/products" className="bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300 transform hover:scale-105 shadow-lg">
                        Shop Collection
                    </Link>
                </div>
            </div>

            {/* Featured Categories */}
            <div className="mb-20">
                <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Shop by Category</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { name: 'Men', img: 'https://images.unsplash.com/photo-1488161628813-99c974fc5bcd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
                        { name: 'Women', img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
                        { name: 'Accessories', img: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' }
                    ].map((cat) => (
                        <div key={cat.name} className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer h-80">
                            <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition duration-300 flex items-center justify-center">
                                <h3 className="text-white text-3xl font-bold border-b-2 border-white pb-2">{cat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="bg-indigo-600 rounded-2xl p-12 text-center text-white mb-12 shadow-xl">
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="mb-8 text-indigo-100">Subscribe for exclusive offers and updates.</p>
                <div className="max-w-md mx-auto flex">
                    <input type="email" placeholder="Your email address" className="flex-1 px-6 py-3 rounded-l-full focus:outline-none text-gray-900" />
                    <button className="bg-gray-900 px-8 py-3 rounded-r-full font-bold hover:bg-gray-800 transition duration-300">Subscribe</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
