import { useContext } from "react";

import AuthContext from "./context";
import authStorage from "./storage";

import userApi from "../api/user";

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const logIn = (authToken) => {
        authStorage.storeToken(authToken);
        
        getCurrentUser();
    };

    const getCurrentUser = async () => {
        const result = await userApi.getCurrentUser();

        if (!result.ok) {
            setUser(null)
            return;
        }

        setUser(result.data)
    }

    const logOut = () => {
        setUser(null);
        authStorage.removeToken();
    };

    return { user, logIn, logOut };
}