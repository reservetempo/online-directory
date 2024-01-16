import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectory } from "../service/handleGet";

export const UserContext = createContext(null);
export const useCurrentUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();
    const [checkedAccount, setCheckedAccount] = useState(false);

    // when setting current user how to unset when timed out?
    // will it work if instance is not running?
    const [currentUser, setCurrentUser] = useState(() => {
        const data = window.sessionStorage.getItem("username");
        if (data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    });

    const updateCurrentUser = (username) => {
        window.sessionStorage.setItem("username", JSON.stringify(username));
        setCurrentUser(username);
    };

    const removeCurrentUser = () => {
        window.sessionStorage.removeItem("username");
        setCurrentUser(null);
    };

    const getUser = async () => {
        const result = await makeFetchRequest(() => getDirectory(user.email));
        
        if (result.result) {
            updateCurrentUser(result.result)
        }
        setCheckedAccount(true);
    }

    useEffect(() => {
        if (user) {
            getUser();
        }
        else {
            removeCurrentUser()
        }
    }, [user])

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser, checkedAccount, setCheckedAccount }}>
        {children}
    </UserContext.Provider>
  );
};
