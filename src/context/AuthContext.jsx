import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const AuthContext = createContext();

// Provide the context
export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);       // e.g., { name, email }
    const [token, setToken] = useState(null);     // JWT or API token

    // Load user/token from localStorage when app starts
    useEffect(() => {
        const savedUser = localStorage.getItem("userId");
        const savedToken = localStorage.getItem("userToken");

        if (savedUser && savedToken) {
            setUserId(savedUser);
            setToken(savedToken);
        }
    }, []);

    // Save user/token to localStorage
    const login = (userid, authToken) => {
        // setUserId(userid);
        // setToken(authToken);
        localStorage.setItem("userId", userid);
        localStorage.setItem("userToken", authToken);
    };

    const logout = () => {
        // setUserId(null);
        // setToken(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("userToken");
    };

    return (
        <AuthContext.Provider value={{ userId, token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for accessing context
export const useAuth = () => useContext(AuthContext);
