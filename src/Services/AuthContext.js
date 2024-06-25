import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const cookies = new Cookies();

    useEffect(() => {
        const storedUser = localStorage.getItem('User');
        if (storedUser) {
            setUser(storedUser)
            setLoading(false)
        }
        else {
            console.log('Navigating to /login');
            navigate('/Login');
        }
    }, [navigate])

    return (
        <AuthContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}