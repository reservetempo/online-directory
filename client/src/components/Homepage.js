import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectories, getDirectory } from "../service/handleGet";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateDirectory from "./CreateDirectory";
import { useCurrentUser } from "./UserContext";
import { Link } from "react-router-dom";

const Homepage = () => {
    const [users, setUsers] = useState(null);
    const { user, isAuthenticated } = useAuth0();
    const { currentUser, checkedAccount } = useCurrentUser();

    const getUsers = async () => {

        const result = await makeFetchRequest(() => getDirectories());
        setUsers(result.result)
    };

    useEffect(() => {
        getUsers();
    }, [])

    return (
        <main>
            {isAuthenticated && !currentUser && checkedAccount &&
            <CreateDirectory 
                userEmail={user.email} 
                getUsers={getUsers}
            />

            }
            <ul>
            {users &&
            users.map((u) => {
                return (
                    <li key={u.username}><Link to={`/${u.username}`}>{u.username}</Link></li>
                )
            })}
            </ul>
        </main>
    )
}

export default Homepage