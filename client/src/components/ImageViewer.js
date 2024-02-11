import styled from "styled-components";
import { useCurrentUser } from "./UserContext";
import { useEffect, useRef, useState } from "react";
import makeFetchRequest from "../utils/make-fetch-request";
import { updateImage } from "../service/handleImages";
import { getDescription } from "../service/handleGet";
import Loading from './Loading';

const ImageViewer = ({image, setImage, pathArray, getUserObj, isThisUser}) => {
    const textareaRef = useRef(null);
    const [text, setText] = useState(null);
    const { getToken, currentDirectory } = useCurrentUser();
    const [loading, setLoading] = useState(null);

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
        const textValue = textareaRef.current.value;
        setLoading("Sending your text to the database")
        const token = await getToken();
        const res = await makeFetchRequest(() => updateImage(pathArray.join("-"),textValue , token));

        getUserObj();
        setText(textValue);
        setLoading(null);
    }
    return (
        <div>
            <h4>{image.title}</h4>
            <StyledImg src={image.imgSrc} />
            <Loading loading={loading}/>
            {!image.descriptionId && isThisUser && !loading && !text &&
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <StyledTextarea ref={textareaRef}></StyledTextarea>
                <button type="submit" disabled={loading}>submit</button>
            </form>
            }
            {text && 
            <pre>{text}</pre>
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