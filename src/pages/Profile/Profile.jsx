// pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import Table from '../../components/Table';
import { apiGet, apiPut } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { snackbar } from '../../context/SnackbarProvider';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';


const Profile = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('profile');

    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        address: '',
    });

    const [orders, setOrders] = useState([]);

    const getUser = async () => {
        try {
            const res = await apiGet('/getUser');
            if (res.data.status === 200) {
                setUser(res.data.data);
            }
        } catch {
            snackbar("Failed to fetch user", 'error');
        }
    };

    const getOrders = async () => {
        try {
            const res = await apiGet('/getUserOrders');
            if (res.data.status === 200) {
                setOrders(res.data.data);
            }
        } catch {
            snackbar("Failed to fetch orders", 'error');
        }
    };

    const handleUpdate = async () => {
        try {
            const res = await apiPut('/updateUser', user);
            if (res.data.status === 200) {
                snackbar(res.data.message, 'success');
            } else {
                snackbar(res.data.message, 'error');
            }
        } catch {
            snackbar("Something went wrong", 'error');
        }
    };

    useEffect(() => {

        getUser();
        getOrders();

    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (

        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-4 md:p-8">
                {/* Header + Logout */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">User Profile</h1>
                    <button
                        onClick={handleLogout}
                        className="mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>

                {/* 🔸 Tab Bar */}
                <div className="mb-6 flex border-b border-gray-300">
                    <button
                        className={`px-4 py-2 mr-4 ${activeTab === 'profile'
                                ? 'border-b-2 border-blue-500 font-semibold text-blue-600'
                                : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('profile')}
                    >
                        My Profile
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === 'orders'
                                ? 'border-b-2 border-blue-500 font-semibold text-blue-600'
                                : 'text-gray-500'
                            }`}
                        onClick={() => setActiveTab('orders')}
                    >
                        Orders
                    </button>
                </div>

                {/* 🔸 Tab Content */}
                {activeTab === 'profile' && (
                    <div className="bg-white shadow-md rounded p-6 max-w-xl mx-auto">
                        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Name"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="tel"
                                placeholder="Phone"
                                value={user.phone}
                                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Address"
                                value={user.address}
                                onChange={(e) => setUser({ ...user, address: e.target.value })}
                                className="w-full p-2 border rounded"
                            />
                            <button
                                onClick={handleUpdate}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'orders' && (
                    <div className="bg-white shadow-md rounded p-6">
                        <h2 className="text-xl font-semibold mb-4">Orders</h2>
                        <Table
                            columns={[
                                { label: 'Order ID', key: '_id' },
                                { label: 'Status', key: 'deliveryStatus' },
                                { label: 'Total Amount', key: 'totalAmount' },
                                { label: 'Total Products', key: 'totalItems' }
                            ]}
                            data={orders}
                        />
                    </div>
                )}
            </div>


            <Footer />
        </>

    );
};

export default Profile;
