import styled from "styled-components";
import makeFetchRequest from "../utils/make-fetch-request";
import { makeDirectory } from "../service/handlePost";
import { useRef } from "react";
import { useCurrentUser } from "./UserContext";

const CreateDirectory = ({userEmail, getUsers}) => {
    const usernameRef = useRef(null);
    const { setCheckedAccount, updateCurrentUser, getToken } = useCurrentUser();

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const token = await getToken();
        const result = await makeFetchRequest(
            () => makeDirectory({username: usernameRef.current.value, email: userEmail}, token));
        setCheckedAccount(true);
        updateCurrentUser(usernameRef.current.value)
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