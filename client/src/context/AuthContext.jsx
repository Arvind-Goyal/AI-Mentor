import {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

import { getCurrentUser } from "../api/auth";

const AuthContext = createContext();

const normalizeUser = (userData) => {
    if (!userData) return null;

    return {
        ...userData,
        _id: userData._id || userData.id,
    };
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authVersion = useRef(0);

    const fetchUser = async () => {
        const requestVersion = authVersion.current;

        try {
            const response = await getCurrentUser();

            if (requestVersion !== authVersion.current) {
                return;
            }

            setUser(normalizeUser(response.user));
        } catch (err) {
            if (requestVersion !== authVersion.current) {
                return;
            }

            setUser(null);
        } finally {
            if (requestVersion === authVersion.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const loginUser = (userData) => {
        authVersion.current += 1;

        setUser(normalizeUser(userData));
        setLoading(false);
    };

    const logoutUser = () => {
        authVersion.current += 1;

        setUser(null);
        setLoading(false);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                loginUser,
                logoutUser,
                fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};