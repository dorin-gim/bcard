import { FunctionComponent, ReactNode, createContext, useContext, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    search: string;
    login: () => void;
    logout: () => void;
    startSearch: (e:any) => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}
 
const AuthProvider: FunctionComponent<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [search, setSearch] = useState<string>("");  

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);
    const startSearch = (e:any) => {
        setSearch(e.target.value);
    }
    return (  <AuthContext.Provider value={{ isLoggedIn,search, login, logout,startSearch }}>
            {children}
        </AuthContext.Provider> );
    

    
}
 
export default AuthProvider;

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};