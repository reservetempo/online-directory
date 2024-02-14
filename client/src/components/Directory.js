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
import Loading from "./Loading";

const Directory = () => {
    const params = useParams();
    const pathArray = Object.values(params);
    const { currentUser, getToken, currentDirectory, updateCurrentDirectory } = useCurrentUser();
    const isThisUser = currentUser === pathArray[0];
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState(null);
    const [deletingElement, setDeletingElement] = useState(null);
    const [loading, setLoading] = useState(false);

    const enterFolder = (obj, path) => {
        let current = obj;

        for (let key of path) {
            if (current[key] !== undefined) {
                current = current[key];
            } 
            else if (key.slice(-1) === ".") {
                const img = current[`-${path[path.length -2]}`].find(e => e.title === key)
                if (!image || image.title !== img.title) {
                    setImage(img)
                }
            }
            else {
                return undefined;
            }
        }
        return current;
    }
    const countdown = () => {
        const start = Date.now();

        const interval = setInterval(() => {
            const remainder = 51000 - (Date.now() - start);
            if (remainder >= 0){
                let seconds = Math.floor((remainder / 1000) % 60);   
                seconds = (seconds < 10) ? "0" + seconds : seconds;
                setLoading(`Booting up server, ${seconds} seconds left`)
            } else {
                clearInterval(interval);
                setLoading(`Booting up server 00`)
            }
        }, 500) 
    }


    const getUserObj = async () => {
        const result = await makeFetchRequest(() => getDirectory(pathArray[0]));
        if (result) {
            updateCurrentDirectory(result.data.userObj);
            setLoading(null);
        }
    };

    useEffect(() => {
        if (!currentDirectory || !currentDirectory[pathArray[0]]) {
            setLoading("Sending a request to the server");
            getUserObj();

            setTimeout(() => {
                countdown();
            }, 5000)

        }
    }, [])

    let currentFolder;
    if (currentDirectory) {
        currentFolder = enterFolder(currentDirectory, pathArray);
    }

    const handleDelete = async (ev, subdir) => {
        ev.preventDefault();
        setLoading("Deleting subdirectory");
        setDeletingElement(subdir)
        const token = await getToken();
        const updateObject = {
            path: pathArray,
            subdir: subdir
        };
        const result = await makeFetchRequest(() => updateDirectory(pathArray[0], updateObject, token));
        getUserObj();
        setLoading(null);
    }

    const handleDeleteImg = async (ev, publicId) => {
        ev.preventDefault();
        setLoading("Deleting image");
        setDeletingElement(publicId)
        const token = await getToken();
        const updateObject = {
            pathArray: pathArray,
            publicId: publicId
        };
        const result = await makeFetchRequest(() => deleteImage(updateObject, token));
        getUserObj();
        setLoading(null);
    }

    return (
        <main>
            {
            // --- DISPLAY PATH ---
            params && 
            <StyledPath>
            {pathArray.map((e, i) => {
                const diff = pathArray.length - (i + 1);
                    return (
                        diff ?
                        <StyledLink key={e} to={`/${pathArray.slice(0, -diff).join("/")}`}>└ {e} </StyledLink>
                        :
                        <span key={e}>└> {e} </span>
                    )
            })}
            </StyledPath>
            }
            {!currentDirectory && <Loading loading={loading}/>}
            {params && 
            pathArray[pathArray.length -1][pathArray[pathArray.length -1].length -1] === "." ?
            // --- DISPLAY IMAGE --- 
            <ImageViewer 
                image={image} 
                setImage={setImage}
                pathArray={pathArray} 
                getUserObj={getUserObj} 
                isThisUser={isThisUser}
            /> :
            // --- OR DISPLAY DIRECTORY ---
            currentDirectory && 
            <>
            <StyledList>
            {currentFolder &&
            Object.keys(currentFolder).map(e => {
                return (
                    <>
                    {e[0] === "-" ? 
            // --- DISPLAY FILES --- 
                    currentFolder[e].map(e => {
                        return (
                            <li key={e.publicId} style={{display: deletingElement === e.publicId ? "none" : "block"}}>
                                <StyledLink to={`/${pathArray.length ? pathArray.join("/")+ "/" + e.title : e.title}`}>░▒ {e.title}</StyledLink>
                                {isEditing && <StyledX onClick={(ev) => handleDeleteImg(ev, e.publicId)}>x</StyledX>}
                            </li>
                        )
                    }) :
            // --- DISPLAY FOLDERS ---
                    <li key={e} style={{display: deletingElement === e ? "none" : "block"}}>
                        <StyledLink to={`/${pathArray.length ? pathArray.join("/")+ "/" + e : e}`}>└ {e} </StyledLink>
                        {isEditing && <StyledX onClick={(ev) => handleDelete(ev, e)}>x</StyledX>}
                    </li>
                    } 
                    </>
                    
                )
            })}
            </StyledList>
            
            <StyledEditZone>
            {isEditing && <UpdateDirectory pathArray={pathArray} getUserObj={getUserObj}/>}
                {isEditing && <ImageUpload pathArray={pathArray} getUserObj={getUserObj} />}
                {isThisUser && 
                // --- EDIT BUTTON ---
                    <StyledButton onClick={() => setIsEditing(!isEditing)}>{isEditing ? "//stop edit" : "//edit"}</StyledButton>
                }
            </StyledEditZone>
            </>
            }
        </main>
    );
}


const StyledPath = styled.div`
    padding: 0.5rem 0.4rem;
    display: flex;
    flex-direction: column;
    border: 1px solid white;
    span, a{
        margin-top: 5px;
    }
    span {
        margin-left: 5px;
        padding: 5px;
        background-color: white;
        color: black;
        display: block;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
`
const StyledList = styled.ul`
    padding-top: 2px;
    padding-bottom: 1px;
    padding-left: 15px;
    border-left: 1px solid white;
    margin-left: 20px;
    
    li {
        margin-top: 10px;
    }
`
const StyledEditZone = styled.footer`
    padding-top: 20px;
`

const StyledButton = styled.button`
    border: none;
`
const StyledX = styled.button`
    color: red;
`
export default Directory;


