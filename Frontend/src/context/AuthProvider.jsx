import React, { createContext, useState, useEffect } from 'react'
import { getMeRequest, getEmployeesRequest } from '../utils/api.js'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const rehydrateUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const data = await getMeRequest();
                    
                    if (data.role === 'admin') {
                        try {
                            const employees = await getEmployeesRequest();
                            data.employees = employees;
                        } catch (err) {
                            console.error("Failed to fetch employees", err);
                            data.employees = [];
                        }
                    }

                    setUserData(data);
                } catch (err) {
                    // Token expired or invalid — clear it
                    localStorage.removeItem('token');
                    setUserData(null);
                }
            }
            setLoading(false);
        };

        rehydrateUser();
    }, []);

    return (
        <AuthContext.Provider value={{ userData, setUserData, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;