// import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectory } from "../service/handleGet";
import { useEffect, useState } from "react";
// import ImageUpload from "./ImageUpload";
import { useCurrentUser } from "./UserContext";
import UpdateDirectory from "./UpdateDirectory";
import { updateDirectory } from "../service/handlePatch";
import ImageUpload from "./ImageUpload";


const enterFolder = (obj, path) => {
    const keys = path;
    let current = obj;

    for (let key of keys) {
        if (current[key] !== undefined) {
            current = current[key];
        } else {
            return undefined;
        }
    }
    return current;
}

const Directory = () => {
    const params = useParams();
    const pathArray = Object.values(params);
    const [userObj, setUserObj] = useState(null);
    const { currentUser } = useCurrentUser();
    const isThisUser = currentUser === pathArray[0];
    
    const getUserObj = async () => {
        const result = await makeFetchRequest(() => getDirectory(pathArray[0]));
        setUserObj(result.data.userObj)
    };

    useEffect(() => {
        getUserObj();
    }, [])

    let currentFolder;
    if (userObj) {
        currentFolder = enterFolder(userObj, pathArray);
    }

    const handleDelete = async (ev, subdir) => {
        ev.preventDefault();

        const updateObject = {
            path: pathArray,
            subdir: subdir
        };
        const result = await makeFetchRequest(() => updateDirectory(pathArray[0], updateObject));
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
            {userObj && 
            // --- DISPLAY FOLDERS ---
            <>
            {Object.keys(currentFolder).map(e => {
                return (
                    <>
                    {e[0] === "-" ? 
            // --- DISPLAY FILES --- 
            // make a component? FileView
                    currentFolder[e].map(e => {
                        console.log({e})
                        return (
                            <li key={e}>file: 
                                <img src={e} style={{height: "20px"}}/> 
                            </li>
                        )
                    }) :
                    <li key={e}>
                        <Link to={`/${pathArray.length ? pathArray.join("/")+ "/" + e : e}`}>> {e} </Link>
                        {isThisUser && <button onClick={(ev) => handleDelete(ev, e)}>-</button>}
                    </li>
                    } 
                    </>
                    
                )
            })}
            
            {isThisUser && <UpdateDirectory pathArray={pathArray} getUserObj={getUserObj}/>}
            </>
            }
            </ul>
            {isThisUser && <ImageUpload pathArray={pathArray} />}
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


