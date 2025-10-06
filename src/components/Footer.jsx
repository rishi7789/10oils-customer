import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import logo from '../assets/random-logo.jpg'

const Footer = () => {
    return (
        <footer className="bg-black text-orange-500 px-6 py-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                {/* Logo + Address */}
                <div className="flex-1">
                    <img src={logo} alt="Logo" className="h-12 mb-4" />
                    <p className="text-sm leading-relaxed text-orange-400">
                        Marathalli<br />
                        Bangalore 560001<br />
                        support@example.com<br />
                        00000022222
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="flex-1">
                    <h3 className="font-semibold mb-3 text-orange-300">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-orange-300">Products</a></li>
                        <li><a href="#" className="hover:text-orange-300">About Us</a></li>
                        <li><a href="#" className="hover:text-orange-300">Contact</a></li>
                        <li><a href="#" className="hover:text-orange-300">FAQs</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="flex-1">
                    <h3 className="font-semibold mb-3 text-orange-300">Follow Us</h3>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="hover:text-orange-300"><FaFacebookF /></a>
                        <a href="#" className="hover:text-orange-300"><FaInstagram /></a>
                        <a href="#" className="hover:text-orange-300"><FaLinkedinIn /></a>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center mt-10 text-xs text-orange-400">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
