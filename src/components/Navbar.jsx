import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // For hamburger menu
    const [cartValue, setCartValue] = useState(0); // Cart item count (this could be dynamic)

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-black text-white px-6 py-4">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img src="/assets" alt="Logo" className="h-8" />
                </div>

                {/* Desktop Navbar */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link to="/" className="text-lg">Home</Link>
                    <div className="relative group">
                        <button className="text-lg">Products</button>
                        <div className="absolute hidden group-hover:block bg-black text-white space-y-2 p-3 rounded-lg mt-2 w-48">
                            <Link to="/products/interior" className="block">Interior</Link>
                            <Link to="/products/exterior" className="block">Exterior</Link>
                            <Link to="/products/detailing-tools" className="block">Detailing Tools</Link>
                            <Link to="/products/paint-protection" className="block">Paint Protection</Link>
                        </div>
                    </div>
                    <Link to="/about" className="text-lg">About</Link>
                    <Link to="/contact" className="text-lg">Contact</Link>
                </div>

                {/* Right-side Sign-in/Signup and Cart */}
                <div className="hidden md:flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                        <div className="text-sm">Sign In / Sign Up</div>
                        <div className="h-8 w-8 bg-orange-500 rounded-full flex items-center justify-center text-white">A</div>
                    </div>
                    <div className="flex items-center space-x-1">
                        <div className="relative">
                            <FaCartPlus className="text-2xl" />
                        </div>
                        <div className="text-white">Cart</div>
                    </div>
                </div>

                {/* Hamburger Menu (Mobile and Tablet View) */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
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
