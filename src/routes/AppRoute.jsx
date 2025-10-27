import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';
import Cart from '../pages/Cart/Cart';
import Profile from '../pages/Profile/Profile';
import Order from '../pages/Order/Order';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';

const AppRoute = () => {

    // const userToken = localStorage.getItem('userToken');


    //   const AuthRoute = () => {

    //   };


    return (
        <BrowserRouter basename="/10oils-customer/">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Product />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/order" element={<Order />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;
