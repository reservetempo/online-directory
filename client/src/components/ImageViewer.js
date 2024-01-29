import styled from "styled-components";
import { useCurrentUser } from "./UserContext";
import { useEffect, useRef, useState } from "react";
import makeFetchRequest from "../utils/make-fetch-request";
import { updateImage } from "../service/handleImages";
import { getDescription } from "../service/handleGet";

const ImageViewer = ({image, pathArray, getUserObj, isThisUser}) => {
    const textareaRef = useRef(null);
    const [text, setText] = useState(null);
    const { getToken } = useCurrentUser();


    const getImgDescription = async () => {
        const id = image.descriptionId
        const result = await makeFetchRequest(() => getDescription({id}));
        setText(result.text);
    };

    useEffect(() => {
        if (!text && image.descriptionId) {
            getImgDescription();
        }
    }, [])

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const token = await getToken();
        const res = await makeFetchRequest(() => updateImage(pathArray.join("-"), textareaRef.current.value, token));
        getUserObj();
    }
    return (
        <div>
            <h1>{image.title}</h1>
            <StyledImg src={image.imgSrc} />
            {!image.descriptionId && isThisUser && 
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <StyledTextarea ref={textareaRef}></StyledTextarea>
                <button type="submit">submit</button>
            </form>
            }
            {text && 
            <p>{text}</p>
            }
        </div>
    )
}

const StyledImg = styled.img`
    width: 90vw;
`

const StyledTextarea = styled.textarea`
    width: 80vw;
    height: 200px;
    border: 1px solid var(--primary);
    background-color: var(--secondary);
    font-family: 'Courier New', Courier, monospace;
    color: var(--primary);
    caret-shape: block;
    caret-color: red;
    
`

export default ImageViewer