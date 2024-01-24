// import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectory } from "../service/handleGet";
import { useEffect, useState } from "react";
import ImageViewer from "./ImageViewer";
import { useCurrentUser } from "./UserContext";
import UpdateDirectory from "./UpdateDirectory";
import { updateDirectory } from "../service/handlePatch";
import ImageUpload from "./ImageUpload";
import { deleteImage } from "../service/handleDelete";

const Directory = () => {
    const params = useParams();
    const pathArray = Object.values(params);
    const { currentUser, getToken, currentDirectory, updateCurrentDirectory } = useCurrentUser();
    const isThisUser = currentUser === pathArray[0];
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);

    const enterFolder = (obj, path) => {
        const keys = path;
        let current = obj;
    console.log("THIS OBJ", obj)
        for (let key of keys) {
            if (current[key] !== undefined) {
                current = current[key];
                // console.log("CURRENT: ", current[key])
            } 
            else if (key[key.length -1] === ".") {
                console.log("CURRENT IMAGE", current[`-${path[path.length -2]}`])
                const img = current[`-${path[path.length -2]}`].find(e => e.title === key)
                if (!image) setImage(img)
            }
            else {
                console.log("DONE: ", current)
                return undefined;
            }
        }
        return current;
    }
    
    const getUserObj = async () => {
        const result = await makeFetchRequest(() => getDirectory(pathArray[0]));
        updateCurrentDirectory(result.data.userObj)
        console.log(result.data.userObj)
    };

    useEffect(() => {
        if (!currentDirectory || !currentDirectory[pathArray[0]]) {
            getUserObj();
        }
    }, [])

    let currentFolder;
    if (currentDirectory) {
        currentFolder = enterFolder(currentDirectory, pathArray);
        // if its image/ fetch url
    }

    const handleDelete = async (ev, subdir) => {
        ev.preventDefault();
        const token = await getToken();
        const updateObject = {
            path: pathArray,
            subdir: subdir
        };
        const result = await makeFetchRequest(() => updateDirectory(pathArray[0], updateObject, token));
        getUserObj();
    }

    const handleDeleteImg = async (ev, publicId) => {
        ev.preventDefault();
        const token = await getToken();
        const updateObject = {
            pathArray: pathArray,
            publicId: publicId
        };
        const result = await makeFetchRequest(() => deleteImage(updateObject, token));
        getUserObj();
    }

    return (
        <StyledWrapper>
            {
            // --- DISPLAY PATH ---
            params && pathArray.map((e, i) => {
                const diff = pathArray.length - (i + 1);
                return (
                    diff ?
                    <Link key={e} to={`/${pathArray.slice(0, -diff).join("/")}`}>{e} > </Link>
                    :
                    <span key={e}>{e} > </span>
                )
            })}

            <ul>
            {params && pathArray[pathArray.length -1][pathArray[pathArray.length -1].length -1] === "." ?
            // --- DISPLAY IMAGE --- 
            <ImageViewer image={image} /> :
            
            currentDirectory && 
            <>
            {currentFolder &&
            Object.keys(currentFolder).map(e => {
                return (
                    <>
                    {e[0] === "-" ? 
            // --- DISPLAY FILES --- 
                    currentFolder[e].map(e => {
                        return (
                            <li key={e}>
                                <img src={e.imgSrc} style={{height: "20px"}}/>
                                <Link to={`/${pathArray.length ? pathArray.join("/")+ "/" + e.title : e.title}`}>{e.title}</Link>
                                {isEditing && <button onClick={(ev) => handleDeleteImg(ev, e.publicId)}>-</button>}
                            </li>
                        )
                    }) :
            // --- DISPLAY FOLDERS ---
                    <li key={e}>
                        <Link to={`/${pathArray.length ? pathArray.join("/")+ "/" + e : e}`}>> {e} </Link>
                        {isEditing && <button onClick={(ev) => handleDelete(ev, e)}>-</button>}
                    </li>
                    } 
                    </>
                    
                )
            })}
            
            {isEditing && 
            <>
                <UpdateDirectory pathArray={pathArray} getUserObj={getUserObj}/>
                <ImageUpload pathArray={pathArray} getUserObj={getUserObj} />
            </>
            }
            {isThisUser && <button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "stop edit" : "edit"}</button>}
            </>
            }
            </ul>

        </StyledWrapper>
    );
}

const StyledWrapper = styled.main`
    /* background-color: black;
    color: white;
    width: 100vw;
    height: 100vh; */
`
export default Directory;


