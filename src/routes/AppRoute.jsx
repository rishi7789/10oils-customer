import { Routes, Route, BrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Home from '../pages/Home/Home';

const AppRoute = () => {

    // const userToken = localStorage.getItem('userToken');


    //   const AuthRoute = () => {

    //   };


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoute;
