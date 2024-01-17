import React, { useEffect, useRef, useState } from 'react'
import makeFetchRequest from '../utils/make-fetch-request';
import { addImage, getImages } from '../service/handleImages';
import { useCurrentUser } from "./UserContext";

const ImageUpload = ({pathArray}) => {
    const [addingImg, setAddingImg] = useState(false);
    const [image, setImage] = useState();
    const formRef = useRef();
    const { getToken } = useCurrentUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken();
        const formData = new FormData();
        formData.append('image', image);

        const res = await makeFetchRequest(() => addImage(formData, pathArray.join("-"), token))
    }
    
  return (
    <div>
        {addingImg ? 
        <>
        <form onSubmit={e => handleSubmit(e)} ref={formRef}>
            <label>
                <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
            </label>
            <button type="submit">Submit</button>
        </form> 
        <button onClick={() => setAddingImg(!addingImg)}>cancel</button> 
        </> :
        <button onClick={() => setAddingImg(!addingImg)}>add image / text</button>
        }
    </div>
  )
}

export default ImageUpload