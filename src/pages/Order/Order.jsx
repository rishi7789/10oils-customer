// pages/OrderPage.js
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { apiPost } from '../../api/axios';
import { snackbar } from '../../context/SnackbarProvider';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const Order = () => {
    const { cartItems, totalAmount, clearCart } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        customerEmail: '',
        customerPhone: '',
        shippingAddress: '',
        paymentMethod: 'online',
    });

    const handleChange = e => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderItems = cartItems.map(item => ({
            productId: item._id,
            produtName: item.name,
            sku: item.sku,
            quantity: item.quantity,
            price: item.salePrice,
        }));

        const reqBody = {
            ...formData,
            orderItems,
            totalAmount,
            paymentStatus: formData.paymentMethod === 'cod' ? 'pending' : 'paid',
        };

        try {
            const res = await apiPost('/createOrder', reqBody);
            if (res.data.status === 200) {
                snackbar(res.data.message, 'success');
                clearCart();
                setFormData({
                    firstName: '',
                    lastName: '',
                    customerEmail: '',
                    customerPhone: '',
                    shippingAddress: '',
                    paymentMethod: 'online',
                })
            }
            else {
                snackbar(res.data.message, 'error');
            }

        } catch (err) {
            snackbar(err.message, 'error');
        }
    };

    return (
        <>
            <Navbar />
            <div className="p-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Place Your Order</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                        />
                        <input
                            name="customerEmail"
                            placeholder="Email"
                            value={formData.customerEmail}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                            type="email"
                        />
                        <input
                            name="customerPhone"
                            placeholder="Phone"
                            value={formData.customerPhone}
                            onChange={handleChange}
                            className="border p-2 rounded w-full"
                            required
                            type="tel"
                        />
                    </div>

                    <textarea
                        name="shippingAddress"
                        placeholder="Shipping Address"
                        value={formData.shippingAddress}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                        rows={3}
                        required
                    />

                    <div className="space-x-4">
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="cod"
                                checked={formData.paymentMethod === 'cod'}
                                onChange={handleChange}
                            /> COD
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="online"
                                checked={formData.paymentMethod === 'online'}
                                onChange={handleChange}
                            /> Online
                        </label>
                    </div>

                    {/* Selected Products Summary */}
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-semibold mb-2">Your Items</h3>
                        <ul className="space-y-2">
                            {cartItems.map(item => (
                                <li key={item._id} className="flex justify-between">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span>₹{item.salePrice * item.quantity}</span>
                                </li>
                            ))}
                        </ul>
                        <p className="text-right font-semibold mt-2">Total: ₹{totalAmount}</p>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                        Place Order
                    </button>

                </form>
            </div>
            <Footer />
        </>
    );
};

export default Order;
