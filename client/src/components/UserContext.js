import { createContext, useContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectory } from "../service/handleGet";

export const UserContext = createContext(null);
export const useCurrentUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [checkedAccount, setCheckedAccount] = useState(false);

    const [currentDirectory, setCurrentDirectory] = useState(() => {
        const data = window.sessionStorage.getItem("currentDirectory");
        if (data) {
            return JSON.parse(data);
        } else {
            return null;
        }
    });

    const updateCurrentDirectory= (currentDirectory) => {
        window.sessionStorage.setItem("currentDirectory", JSON.stringify(currentDirectory));
        setCurrentDirectory(currentDirectory);
    };

    const removeCurrentDirectory = () => {
        window.sessionStorage.removeItem("currentDirectory");
        setCurrentDirectory(null);
    };

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
    const getToken = async () => {
        return await getAccessTokenSilently();
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
    <UserContext.Provider value={
        { currentDirectory, 
        updateCurrentDirectory, 
        currentUser, 
        updateCurrentUser, 
        checkedAccount, 
        setCheckedAccount, 
        getToken }
        }>
        {children}
    </UserContext.Provider>
  );
};
