import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const login = async (username, password) => {
        try {
            const data = await AuthService.login(username, password);
            setCurrentUser(data);
            if (data.roles.includes('ROLE_ADMIN')) {
                navigate('/admin');
            } else {
                navigate('/');
            }
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        AuthService.logout();
        setCurrentUser(undefined);
        navigate('/login');
    };

    const register = async (username, email, password, role) => {
        try {
            await AuthService.register(username, email, password, role);
            navigate('/login');
        } catch (error) {
            throw error;
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};
