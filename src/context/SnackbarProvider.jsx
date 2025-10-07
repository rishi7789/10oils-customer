// components/SnackbarProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineWarning } from 'react-icons/ai';

// Create a context
const SnackbarContext = createContext();

// Exported global function placeholder
let showSnackbarGlobal = () => { };

// Global access function (you'll use this in your app)
export const snackbar = (message, type = 'success') => {
    showSnackbarGlobal(message, type);
};

export const SnackbarProvider = ({ children }) => {
    const [snack, setSnack] = useState(null);

    useEffect(() => {
        // Assign the global function to set state
        showSnackbarGlobal = (message, type) => {
            setSnack({ message, type });
            setTimeout(() => setSnack(null), 3000);
        };
    }, []);

    const icons = {
        success: <AiOutlineCheckCircle className="text-green-600 w-5 h-5" />,
        error: <AiOutlineCloseCircle className="text-red-600 w-5 h-5" />,
        warning: <AiOutlineWarning className="text-yellow-600 w-5 h-5" />,
    };

    const styles = {
        success: 'bg-green-100 text-green-800 border-green-500',
        error: 'bg-red-100 text-red-800 border-red-500',
        warning: 'bg-yellow-100 text-yellow-800 border-yellow-500',
    };

    return (
        <SnackbarContext.Provider value={{}}>
            {children}

            {snack && (
                <div className="fixed top-5 right-5 z-50">
                    <div className={`flex items-center gap-2 px-4 py-2 border rounded shadow-md ${styles[snack.type]}`}>
                        {icons[snack.type]}
                        <span className="text-sm">{snack.message}</span>
                    </div>
                </div>
            )}
        </SnackbarContext.Provider>
    );
};
