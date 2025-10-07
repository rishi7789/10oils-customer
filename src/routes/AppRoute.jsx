import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Product from '../pages/Product/Product';

const AppRoute = () => {

    // const userToken = localStorage.getItem('userToken');


    //   const AuthRoute = () => {

    //   };


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/products" element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;
