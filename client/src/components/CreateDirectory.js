import styled from "styled-components";
import makeFetchRequest from "../utils/make-fetch-request";
import { makeDirectory } from "../service/handlePost";
import { useRef } from "react";

const CreateDirectory = ({userEmail, setHasAccount, getUsers}) => {
    const usernameRef = useRef(null);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        console.log({username: usernameRef.current.value, email: userEmail})

        const result = await makeFetchRequest(
            () => makeDirectory({username: usernameRef.current.value, email: userEmail}));
        
        setHasAccount(true);
        getUsers();
    }

    return (
        <div>
            <h2>CreateDirectory</h2>
            <form onSubmit={ev => handleSubmit(ev)}>
                <label htmlFor="username">your username: 
                    <input type="text" name="username" ref={usernameRef} /> 
                </label>
                <input type="submit" value="create" />
            </form>
        </div>
    )
}

export default CreateDirectory