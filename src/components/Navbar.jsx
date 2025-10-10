import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus, FaChevronDown } from "react-icons/fa";
import logo from '../assets/random-logo.jpg'
import { IoIosMenu } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { apiGet } from "../api/axios";
import { snackbar } from "../context/SnackbarProvider";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // For hamburger menu
    const [cartValue, setCartValue] = useState(0); // Cart item count (this could be dynamic)
    const navigate = useNavigate();

    const { token } = useAuth();

    console.log("token in navbar", token);



    const [user, setUser] = useState([]);

    const getUser = async () => {
        try {
            const response = await apiGet('/getUser');

            if (response.data.status === 200) {
                setUser(response.data.data);
            } else {
                snackbar(response.data.message, 'error');
            }
        } catch (error) {
            snackbar("Failed to fetch user", 'error');
        }
    }

    useEffect(() => {
        if (token) {
            getUser();
        }
    }, [token]);

    console.log("user", user);



    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-black text-white px-6 py-4">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div >
                    <img src={logo} alt="Logo" className="h-12" />
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-lg">Home</Link>
                    <div className="relative group inline-block text-left">
                        <div className="flex items-center cursor-pointer text-lg" onClick={() => navigate('/products')}>
                            <span>Products</span>
                            <FaChevronDown className="ml-1 text-sm" />
                        </div>

                        <div className="absolute hidden group-hover:block bg-black text-white space-y-2 p-3 rounded-lg mt-2 w-56 z-20">
                            <Link to="/products/interior" className="block hover:underline">Interior</Link>
                            <Link to="/products/exterior" className="block hover:underline">Exterior</Link>
                            <Link to="/products/detailing-tools" className="block hover:underline">Detailing Tools</Link>
                            <Link to="/products/paint-protection" className="block hover:underline">Paint Protection</Link>
                        </div>
                    </div>
                    <Link to="/about" className="text-lg">About</Link>
                    <Link to="/contact" className="text-lg">Contact</Link>
                </div>

                {/* Right-side Sign-in/Signup and Cart */}
                <div className="hidden md:flex items-center space-x-6">
                    {
                        token ? (
                            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/profile')}>

                                <div className="text-sm">{`welcome ${user.username}!`}</div>
                            </div>
                        ) : (
                            <button className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 cursor-pointer rounded" onClick={() => navigate('/login')}>
                                Sign up
                            </button>
                        )

                    }

                    <div className="flex items-center space-x-1 cursor-pointer" onClick={() => navigate('/cart')}>
                        <div className="relative">
                            <FaCartPlus className="text-2xl" />
                        </div>
                        <div className="text-white">Cart</div>
                    </div>
                </div>

                {/* Hamburger Menu (Mobile and Tablet View) */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        <IoIosMenu className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden bg-black text-white space-y-4 mt-4 px-6 py-4">
                    <Link to="/" className="block">Home</Link>
                    <Link to="/about" className="block">About</Link>
                    <Link to="/contact" className="block">Contact</Link>

                    <div className="relative group">
                        <button className="block w-full text-left">Products</button>
                        <div className="absolute hidden group-hover:block bg-black text-white space-y-2 p-3 rounded-lg mt-2 w-full">
                            <Link to="/products/interior" className="block">Interior</Link>
                            <Link to="/products/exterior" className="block">Exterior</Link>
                            <Link to="/products/detailing-tools" className="block">Detailing Tools</Link>
                            <Link to="/products/paint-protection" className="block">Paint Protection</Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
