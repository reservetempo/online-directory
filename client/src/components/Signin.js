import { useAuth0 } from "@auth0/auth0-react";

const Signin = () => {
    const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
    return (
        <div>
            {!isAuthenticated ?
            <button onClick={() => loginWithRedirect()}>Sign In</button>
            :
            <button onClick={() => logout()}>Sign Out</button>
            }
        </div>
    );
}

export default Signin;