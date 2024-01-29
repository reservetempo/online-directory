import React, { useEffect, useRef, useState } from 'react'
import makeFetchRequest from '../utils/make-fetch-request';
import { addImage, getImages } from '../service/handleImages';
import { useCurrentUser } from "./UserContext";
import styled from 'styled-components';

const ImageUpload = ({pathArray, getUserObj}) => {
    const [addingImg, setAddingImg] = useState(false);
    const [image, setImage] = useState();
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
        
        const res = await makeFetchRequest(() => addImage(formData, pathArray.join("-"), token))
        getUserObj()
    }
    
  return (
    <StyledWrapper>
        {addingImg ? 
        <>
        <StyledForm onSubmit={e => handleSubmit(e)} ref={formRef}>
            <label htmlFor='docName'> Title :
                <input type="text" name="docName" ref={nameRef} />
            </label>
            <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
            <button type="submit">Submit</button>
        </StyledForm> 
        <button onClick={() => setAddingImg(!addingImg)}>cancel</button> 
        </> :
        <button onClick={() => setAddingImg(!addingImg)}>add image / text</button>
        }
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
    border: 1px solid var(--primary);
    margin: 3px;
    padding: 3px;
`

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    >* {
        padding: 0.3rem;
    }
`

export default ImageUpload