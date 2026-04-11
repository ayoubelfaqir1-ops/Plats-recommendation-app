import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import {
    login as loginRequest,
    logout as logoutRequest,
    register as registerRequest,
} from "../services/Auth.service";

/* eslint-disable react-refresh/only-export-components */
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        const profile = await api.get("/profile");
        setUser(profile);
        return profile;
    };

    // Load user on app start (refresh persistence)
    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    setLoading(false);
                    return;
                }

                await refreshUser();
            } catch (err) {
                console.error("Load user error:", err);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            const res = await loginRequest(email, password);
            const { user, token } = res;

            localStorage.setItem("token", token);
            setUser(user);

            return user;
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    };

    const register = async (payload) => {
        try {
            const res = await registerRequest(payload);
            const { user, token } = res;

            localStorage.setItem("token", token);
            setUser(user);

            return user;
        } catch (err) {
            console.error("Register error:", err);
            throw err;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            await logoutRequest();
        } catch {
            console.warn("Logout request failed (token may be invalid)");
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                refreshUser,
                setUser,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for cleaner usage
export const useAuth = () => {
    return useContext(AuthContext);
};
