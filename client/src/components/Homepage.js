import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectories, getDirectory } from "../service/handleGet";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import CreateDirectory from "./CreateDirectory";
import { useCurrentUser } from "./UserContext";
import { Link } from "react-router-dom";
import Loading from './Loading';

const Homepage = () => {
    const [users, setUsers] = useState(null);
    const { user, isAuthenticated } = useAuth0();
    const { currentUser, checkedAccount } = useCurrentUser();
    const [loading, setLoading] = useState(null);

    const getUsers = async () => {
        const result = await makeFetchRequest(() => getDirectories());
        
        if (result) {
            setUsers(result.result)
            setLoading(null)
        }

    };
    const countdown = () => {
        const start = Date.now();

        const interval = setInterval(() => {
            const remainder = 51000 - (Date.now() - start);
            if (remainder >= 0){
                let seconds = Math.floor((remainder / 1000) % 60);
                let milliseconds = Math.floor(remainder % 1000);

                seconds = (seconds < 10) ? "0" + seconds : seconds;
                setLoading(`Booting up server, ${seconds} seconds left`)
            } else {
                clearInterval(interval);
                setLoading(`Booting up server 00`)
            }
        }, 500)

       
    }

    useEffect(() => {
        if (!users) {
            setLoading(`Sending a request to the server`)
            getUsers();

            setTimeout(() => {
                countdown()
            }, 5000)

        }

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
            {users ?
            users.map((u) => {
                return (
                    <li key={u.username}><Link to={`/${u.username}`}>{u.username}</Link></li>
                )
            }) :
            <>
            <Loading loading={loading} />
            </>

            }
            </ul>
        </main>
    )
}

export default Homepage