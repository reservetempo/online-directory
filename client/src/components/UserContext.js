import { createContext, useContext, useState } from "react";

export const UserContext = createContext(null);

export const useCurrentUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
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

    const removeCurrentUser = (username) => {
        window.sessionStorage.setItem("username", JSON.stringify(username));
        setCurrentUser(username);
    };

  return (
    <UserContext.Provider value={{ currentUser, updateCurrentUser }}>
        {children}
    </UserContext.Provider>
  );
};
