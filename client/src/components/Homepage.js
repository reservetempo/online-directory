import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectories, getDirectory } from "../service/handleGet";
import { useEffect, useRef, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { makeDirectory } from "../service/handlePost";
import CreateDirectory from "./CreateDirectory";

const Homepage = () => {
    const [users, setUsers] = useState(null);
    const { user, isAuthenticated } = useAuth0();
    // only run if context is null
    const [checkedAccount, setCheckedAccount] = useState(false);
    const [hasAccount, setHasAccount] = useState(false);
    const usernameRef = useRef(null);

    const getUsers = async () => {
        const result = await makeFetchRequest(() => getDirectories());
        setUsers(result.result)
    };

    const getUser = async () => {
        const result = await makeFetchRequest(() => getDirectory(user.email));
        if (result.result) {
            setHasAccount(true);
        }
        setCheckedAccount(true)
    }

    useEffect(() => {
        getUsers();
    }, [])

    useEffect(() => {
        if (user) getUser();
    }, [user])

    return (
        <main>
            <h1>homepage</h1>
            {isAuthenticated && checkedAccount && !hasAccount &&
            <CreateDirectory 
                userEmail={user.email} 
                setHasAccount={setHasAccount} 
                getUsers={getUsers}
            />

            }
            <ul>
            {users &&
            users.map((u) => {
                return (
                    <li key={u.username}><p>{u.username}</p></li>
                )
            })}
            </ul>
        </main>
    )
}

export default Homepage