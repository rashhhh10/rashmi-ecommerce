import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats');
                setStats(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching stats", error);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-10">Loading Dashboard...</div>;

    return (
        <div>
            <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="text-gray-500 uppercase text-sm font-bold mb-2">Total Users</div>
                    <div className="text-3xl font-bold">{stats.totalUsers}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                    <div className="text-gray-500 uppercase text-sm font-bold mb-2">Total Products</div>
                    <div className="text-3xl font-bold">{stats.totalProducts}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
                    <div className="text-gray-500 uppercase text-sm font-bold mb-2">Total Orders</div>
                    <div className="text-3xl font-bold">{stats.totalOrders}</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <div className="text-gray-500 uppercase text-sm font-bold mb-2">Total Revenue</div>
                    <div className="text-3xl font-bold">${stats.totalRevenue}</div>
                </div>
            </div>

            {/* Placeholder for management sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Recent Orders</h3>
                    <p className="text-gray-500 italic">Order list visualization coming soon...</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-4">Product Management</h3>
                    <p className="text-gray-500 italic">CRUD operations interface coming soon...</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
