import { useRef, useState } from "react";
import makeFetchRequest from "../utils/make-fetch-request";
import { updateDirectory } from "../service/handlePatch";
import { useAuth0 } from "@auth0/auth0-react";

const UpdateDirectory = ({pathArray, getUserObj}) => {
    const [isAdding, setIsAdding] = useState(false);
    const nameRef = useRef(null);
    const { user, isAuthenticated, getAccessTokenSilently} = useAuth0();


    const handleSubmit = async (ev) => {
        const token = await getAccessTokenSilently();
        
        ev.preventDefault();
        const updateObject = {
            path: pathArray,
            newSubdir: nameRef.current.value
        };
        const result = await makeFetchRequest(() => updateDirectory(pathArray[0], updateObject, token));
        setIsAdding(!isAdding);
        getUserObj();
    }
    return (
        <>
        {!isAdding ? 
        <button onClick={() => setIsAdding(!isAdding)}>+</button> :

        <form onSubmit={(ev) => handleSubmit(ev)}>
            <input type="text" name="subdirectory" placeholder="subdirectory name" ref={nameRef} />

            <button type="submit">add</button>
            <button onClick={() => setIsAdding(!isAdding)}>cancel</button>
        </form>
        }
        </>

    )
}

export default UpdateDirectory