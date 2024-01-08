import React, { useEffect, useRef, useState } from 'react'
import makeFetchRequest from '../utils/make-fetch-request';
import { addProduct, getProducts } from '../service/handleProducts';

const ImageUpload = () => {
    const [images, setImages] = useState([]);
    const [image, setImage] = useState();
    const formRef = useRef();

    const getData = async () => {
        const res = await makeFetchRequest(() => getProducts());
        console.log(res)
        const urls = res.data.map(bi => {
            const blob = new Blob([bi], {type: 'image/jpeg'});
            return URL.createObjectURL(blob);
        })
        console.log(urls)
        setImages(urls)
    }

    useEffect(() => {
        // getData();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', image);
        // for (let [key, value] of formData.entries()) {
        //     console.log(`${key}:`, value);
        // }
        const res = await makeFetchRequest(() => addProduct(formData))
        // console.log(res)
    }
  return (
    <div>
        <h1>upload product form</h1>
        <form onSubmit={e => handleSubmit(e)} ref={formRef}>
        <label>Image
                <input type="file" name="image" onChange={e => setImage(e.target.files[0])}/>
        </label>
        <button type="submit">Submit</button>
        </form>
        {/* {images && images.map(e => {
            return (
                <img src={e} />
            )
        })} */}

    </div>
  )
}

export default ImageUpload