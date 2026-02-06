import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            const storedUser = JSON.parse(localStorage.getItem("user"));
            
            let parsedUser = null;
        try {
            parsedUser = storedUser ? JSON.parse(storedUser) : null;
        } catch {
            localStorage.removeItem("user");
        }

            if (!token) {
                setLoading(false);


                return;
            }

            if(parsedUser){
                setUser(parsedUser);
                setIsAuthenticated(true);
            }

            try {
                const res = await axios.get(
                    "http://localhost:5000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setUser(res.data);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(res.data));
            } catch (err) {
                
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
