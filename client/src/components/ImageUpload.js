import React, { useEffect, useRef, useState } from 'react'
import makeFetchRequest from '../utils/make-fetch-request';
import { addImage, getImages } from '../service/handleImages';
import { useCurrentUser } from "./UserContext";
import styled from 'styled-components';

const ImageUpload = ({pathArray, getUserObj}) => {
    const [addingImg, setAddingImg] = useState(false);
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState(null);
    const formRef = useRef(null);
    const nameRef = useRef(null);
    const { getToken } = useCurrentUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = await getToken();
        const title = nameRef.current.value + ".";
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        
        setAddingImg(!addingImg);
        setImage(null);
        const res = await makeFetchRequest(() => addImage(formData, pathArray.join("-"), token))
        
        getUserObj()
    }
    
  return (
    <StyledWrapper>
        {addingImg ? 
        <StyledForm onSubmit={e => handleSubmit(e)} ref={formRef}>
            <label htmlFor='docName'> Title :
                <input type="text" name="docName" ref={nameRef} hasText={title && title.length} 
                onChange={e => setTitle(e.target.value)}/>
            </label>
            
            <input type="file" name="image" id="image" onChange={e => setImage(e.target.files[0])}/>
            {image ?
            <>
                <p>{image.name}</p>
                <button type="submit">Submit</button>
            </>
            :
            <StyledChooseFile htmlFor='image'>Choose Image</StyledChooseFile>
            }
            <button onClick={() => {setAddingImg(!addingImg); setImage(null)}}>cancel</button> 
        </StyledForm> 
        :
        <button onClick={() => setAddingImg(!addingImg)}>add image</button>
        }
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
    margin: 3px;
    padding: 3px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    >* {
        padding: 0.3rem;
    }
    input[type="text"] {
        color: ${props => !props.hasText && 'white'};
        border: none;
        background-color: black;
        font-family: 'Courier New', Courier, monospace;
    }
    input[type="file"]{
        display: none;
    } 
    button {
        margin: 0.2rem 0.3rem;
        width: 4rem;
    }
`

const StyledChooseFile = styled.label`
    border: 1px solid white;
    display: inline-block;
    padding: 0.2rem 0.3rem; 
    width: 9rem;
    cursor: pointer;
`

export default ImageUpload