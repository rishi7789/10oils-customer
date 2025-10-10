import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    // Load token from localStorage when app starts
    useEffect(() => {
        const savedToken = localStorage.getItem("userToken");

        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Save user/token to localStorage
    const login = (userid, authToken) => {
        localStorage.setItem("userToken", authToken);
        setToken(authToken);

    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing context
export const useAuth = () => useContext(AuthContext);
