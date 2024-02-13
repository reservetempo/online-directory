import { useRef, useState } from "react";
import makeFetchRequest from "../utils/make-fetch-request";
import { updateDirectory } from "../service/handlePatch";
import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import Loading from "./Loading";
import { handleTitle } from "../utils/handleTitle";

const UpdateDirectory = ({pathArray, getUserObj}) => {
    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState("");
    const nameRef = useRef(null);
    const { getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(null);

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        setLoading("Adding subdirectory");
        const updateObject = {
            path: pathArray,
            newSubdir: nameRef.current.value
        };
        setIsAdding(!isAdding);
        const token = await getAccessTokenSilently();
        const result = await makeFetchRequest(() => updateDirectory(pathArray[0], updateObject, token));
        getUserObj();
        setTitle("");
        setLoading(null);
    }
    return (
        <>
        {<Loading loading={loading}/>}
        {!isAdding ? 
        <StyledButton onClick={() => setIsAdding(!isAdding)}>//add subdirectory</StyledButton> :

        <form onSubmit={(ev) => handleSubmit(ev)}>
            <StyledSpan>▌</StyledSpan>
            <StyledInput type="text" name="subdirectory" placeholder="subdirectory name" ref={nameRef} 
            onChange={e => setTitle(handleTitle(e.target.value))}
            value={title}/>

            <button type="submit" disabled={loading}>add</button>
            <StyledButton onClick={() => setIsAdding(!isAdding)}>x</StyledButton>
        </form>
        }
        </>

    )
}

const StyledButton = styled.button`
    border: none;
`

const StyledSpan = styled.span`
    animation: blink 1s step-end infinite;
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`
const StyledInput = styled.input`
    background-color: black;
    color: white;
    border: none;
`
export default UpdateDirectory