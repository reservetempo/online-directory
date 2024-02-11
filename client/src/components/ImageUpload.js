import React, { useEffect, useRef, useState } from 'react'
import makeFetchRequest from '../utils/make-fetch-request';
import { addImage, getImages } from '../service/handleImages';
import { useCurrentUser } from "./UserContext";
import styled from 'styled-components';
import Loading from './Loading';

const ImageUpload = ({pathArray, getUserObj}) => {
    const [addingImg, setAddingImg] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [isntValid, setIsntValid] = useState(false);
    const formRef = useRef(null);
    const nameRef = useRef(null);
    const { getToken } = useCurrentUser();
    const [loading, setLoading] = useState(null);

    const handleTitle = (value) => {
        let newTitle = value;
        if (value[value.length -1] === " ") {
            newTitle = value.slice(0, value.length -1) + "_";
        }
        setTitle(newTitle)
    }
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading("Sending your image to the server");
        const validateInput = (value) => /^[A-Za-z0-9_]+$/.test(value);

        if (validateInput(nameRef.current.value)) {
            
            const title = nameRef.current.value + ".";
            const formData = new FormData();
            formData.append('title', title);
            formData.append('image', image);
            
            setAddingImg(true);
            setTitle("");
            setImage(null);
            const token = await getToken();

            const res = await makeFetchRequest(() => addImage(formData, pathArray.join("-"), token))
            getUserObj()
            setLoading(null)
            setAddingImg(false);
        } else {
            setIsntValid(true);
            setLoading(null)
        }

    }
    
  return (
    <StyledWrapper>
        <Loading loading={loading} />
        {addingImg ? 
        <StyledForm onSubmit={e => handleSubmit(e)} ref={formRef}>
            {isntValid && <p style={{color: "red"}}>no spaces or special characters allowed except "_"</p>}
            {!loading && 
            <label htmlFor='docName'>
            <StyledSpan>▌</StyledSpan>
                <input type="text" name="docName" 
                ref={nameRef} 
                placeholder="image title"
                required
                hasText={title && title.length} 
                onChange={e => handleTitle(e.target.value)}
                value={title}/>
                <StyledButton onClick={() => {setAddingImg(false); setImage(null); setIsntValid(false)}}>x</StyledButton> 
            </label>}
            
            <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])}/>
            {image ?
            <>
                <p>{image.name}</p>
                <button type="submit" disabled={loading}>Submit</button>
            </>
            :
            <StyledChooseFile htmlFor='image'>> choose image</StyledChooseFile>
            }
            
        </StyledForm> 
        :
        <>
        {!loading && 
        <StyledButton onClick={() => setAddingImg(true)}>//add image</StyledButton>
        }
        </>
        }
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
`
const StyledSpan = styled.span`
    animation: blink 1s step-end infinite;
    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    input[type="text"] {
        color: ${props => !props.hasText && 'white'};
        border: none;
        background-color: black;
        font-family: 'Courier New', Courier, monospace;
    }
    input[type="file"]{
        display: none;
    } 
`
const StyledButton = styled.button`
    border: none;
`
const StyledChooseFile = styled.label`
    border: 1px solid white;
    display: inline-block;
    padding: 0.2rem 0.3rem; 
    width: 9rem;
    cursor: pointer;
`

export default ImageUpload