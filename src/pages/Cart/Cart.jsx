// pages/Cart.js
import { useCart } from "../../context/CartContext";
import { FaTrash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { snackbar } from "../../context/SnackbarProvider";

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
    const navigate = useNavigate();
    const { token } = useAuth();

    const handleCheckout = () => {
        if (!token) {
            snackbar("Please login to checkout", 'error');
            return;
        }
        navigate("/order");
    };


    //for add,update,delete,get cart we can do from backend so that to avoid storing cart items to localstorage(bcz when logout and logs in or page refreshes then cart items should be visible for that user)
    return (
        <>
            <Navbar />
            <div className="p-4 max-w-4xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map(item => (
                            <div
                                key={item._id}
                                className="flex flex-col sm:flex-row items-center border rounded p-4 gap-4"
                            >
                                <img
                                    src={item.images[0].replace(
                                        "https://gvcc-test-bucket.8edf79e3d9388dbe6f1b6f57f15731b6.r2.cloudflarestorage.com",
                                        "https://pub-61ad9d5d30f1469183ed72e08040b631.r2.dev"
                                    )}
                                    alt={item.name}
                                    className="w-24 h-24 object-contain"
                                />
                                <div className="flex-1 w-full">
                                    <h3 className="font-medium text-lg">{item.name}</h3>
                                    <p className="text-sm text-gray-600">₹{item.salePrice}</p>
                                    <p className="text-sm text-green-600">Stock: {item.stock}</p>

                                    <div className="flex items-center mt-2 gap-2">
                                        <button
                                            onClick={() =>
                                                updateQuantity(item._id, Math.max(1, item.quantity - 1))
                                            }
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() =>
                                                updateQuantity(item._id, Math.min(item.stock, item.quantity + 1))
                                            }
                                            className="px-2 py-1 bg-gray-200 rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500"
                                    >
                                        <FaTrash />
                                    </button>
                                    <p className="mt-4 font-semibold">₹{item.salePrice * item.quantity}</p>
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-between items-center border-t pt-4 mt-4">
                            <p className="text-xl font-semibold">Total: ₹{totalAmount}</p>
                            <button onClick={handleCheckout} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Cart;
