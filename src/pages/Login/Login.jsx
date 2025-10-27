import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import { apiPostNoToken } from "../../api/axios";
import { snackbar } from "../../context/SnackbarProvider";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [activeTab, setActiveTab] = useState("signin");

    const { login } = useAuth();
    const navigate = useNavigate();

    // sign in state
    const [signInData, setSignInData] = useState({ email: "", password: "" });
    const [signInErrors, setSignInErrors] = useState({});
    const [showSignInPassword, setShowSignInPassword] = useState(false);

    // signup state
    const [signUpData, setSignUpData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [signUpErrors, setSignUpErrors] = useState({});
    const [showSignUpPassword, setShowSignUpPassword] = useState(false);

    //tab toggle
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
        // Reset all fields and errors
        setSignInData({ email: "", password: "" });
        setSignUpData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
        });
        setSignInErrors({});
        setSignUpErrors({});
        setShowSignInPassword(false);
        setShowSignUpPassword(false);
    };


    const handleSignInChange = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value });
    };

    const handleSignUpChange = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
    };

    const validateSignIn = () => {
        const errors = {};
        if (!signInData.email) errors.email = "Email is required";
        if (!signInData.password) errors.password = "Password is required";
        setSignInErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const validateSignUp = () => {
        const errors = {};
        if (!signUpData.username) errors.username = "User name is required";
        if (!signUpData.email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(signUpData.email)) errors.email = 'Invalid email';
        if (!signUpData.phone) errors.phone = "Phone is required";
        if (!signUpData.password) errors.password = "Password is required";
        if (signUpData.password !== signUpData.confirmPassword)
            errors.confirmPassword = "Passwords do not match";
        setSignUpErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSignInSubmit = async (e) => {
        e.preventDefault();
        if (!validateSignIn()) return;

        const req = {
            email: signInData.email,
            password: signInData.password,
        };

        try {
            const response = await apiPostNoToken('/loginUser', req);
            console.log("Response :", response.data);

            if (response.data.status === 200) {
                snackbar(response.data.message, 'success');
                login(response.data.data._id, response.data.token);
                setSignInData({ email: "", password: "" });
                navigate('/');
            } else {
                snackbar(response.data.message, 'error');
            }

        } catch (error) {

            snackbar(error.message, 'error');

        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!validateSignUp()) return;

        const req = {
            username: signUpData.username,
            email: signUpData.email,
            phone: signUpData.phone,
            password: signUpData.password,
        };

        try {
            const response = await apiPostNoToken('/registerUser', req);
            console.log("Response :", response.data);

            if (response.data.status === 200) {
                snackbar(response.data.message, 'success');
                handleTabSwitch('signin');
            } else {
                snackbar(response.data.message, 'error');
            }

        } catch (error) {

            snackbar(error.message, 'error');

        }
    };

    return (
        <>
            <Navbar />


            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

                <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
                    {/* Tabs */}
                    <div className="flex justify-between mb-6 border-b">
                        <button
                            onClick={() => handleTabSwitch("signin")}
                            className={`w-1/2 py-2 font-semibold ${activeTab === "signin"
                                ? "border-b-2 border-orange-500 text-orange-500"
                                : "text-gray-500"
                                }`}
                        >
                            Sign In
                        </button>
                        <button
                            onClick={() => handleTabSwitch("signup")}
                            className={`w-1/2 py-2 font-semibold ${activeTab === "signup"
                                ? "border-b-2 border-orange-500 text-orange-500"
                                : "text-gray-500"
                                }`}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* sign in */}
                    {activeTab === "signin" && (
                        <form onSubmit={handleSignInSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={signInData.email}
                                    onChange={handleSignInChange}
                                    placeholder="Email"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {signInErrors.email && (
                                    <p className="text-red-500 text-sm">{signInErrors.email}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type={showSignInPassword ? "text" : "password"}
                                    name="password"
                                    value={signInData.password}
                                    onChange={handleSignInChange}
                                    placeholder="Password"
                                    className="w-full border px-3 py-2 rounded pr-10"
                                />
                                <span
                                    onClick={() => setShowSignInPassword((prev) => !prev)}
                                    className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
                                >
                                    {showSignInPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                                {signInErrors.password && (
                                    <p className="text-red-500 text-sm">{signInErrors.password}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 cursor-pointer"
                            >
                                Sign In
                            </button>
                        </form>
                    )}

                    {/* sign up */}
                    {activeTab === "signup" && (
                        <form onSubmit={handleSignUpSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    value={signUpData.username}
                                    onChange={handleSignUpChange}
                                    placeholder="Name"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {signUpErrors.username && (
                                    <p className="text-red-500 text-sm">{signUpErrors.username}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={signUpData.email}
                                    onChange={handleSignUpChange}
                                    placeholder="Email"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {signUpErrors.email && (
                                    <p className="text-red-500 text-sm">{signUpErrors.email}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={signUpData.phone}
                                    onChange={handleSignUpChange}
                                    placeholder="Phone"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {signUpErrors.phone && (
                                    <p className="text-red-500 text-sm">{signUpErrors.phone}</p>
                                )}
                            </div>

                            <div className="relative">
                                <input
                                    type={showSignUpPassword ? "text" : "password"}
                                    name="password"
                                    value={signUpData.password}
                                    onChange={handleSignUpChange}
                                    placeholder="Password"
                                    className="w-full border px-3 py-2 rounded pr-10"
                                />
                                <span
                                    onClick={() => setShowSignUpPassword((prev) => !prev)}
                                    className="absolute top-2.5 right-3 cursor-pointer text-gray-500"
                                >
                                    {showSignUpPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                                {signUpErrors.password && (
                                    <p className="text-red-500 text-sm">{signUpErrors.password}</p>
                                )}
                            </div>

                            <div>
                                <input
                                    type={showSignUpPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={signUpData.confirmPassword}
                                    onChange={handleSignUpChange}
                                    placeholder="Confirm Password"
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {signUpErrors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{signUpErrors.confirmPassword}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 cursor-pointer"
                            >
                                Sign Up
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    );
};

export default Login;
