import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');

    const login = (user) => {
        setIsAuthenticated(true);
        setUsername(user);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            username,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}