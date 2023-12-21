import { useAuth0 } from "@auth0/auth0-react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import makeFetchRequest from "../utils/make-fetch-request";
import { getDirectory } from "../service/handleGet";
import { useEffect } from "react";


function enterFolder(obj, path) {
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

const Homepage = ({myObj}) => {
    const params = useParams();
    const folders = Object.values(params);
    let currentFolder;
    if (myObj) {
        currentFolder = enterFolder(myObj, folders);
    }

    return (
        <StyledWrapper>
            {
            // --- DISPLAY PATH ---
            params && folders.map((e, i) => {
                const diff = folders.length - (i + 1);
                return (
                    diff ?
                    <Link key={e} to={`/${folders.slice(0, -diff).join("/")}`}>{e} > </Link>
                    :
                    <span key={e}>{e}</span>
                )
            })}
            <ul>
            {myObj &&
            // --- DISPLAY FILES --- 
            Array.isArray(currentFolder) ? 
            currentFolder.map(e => {
                return (
                    <li key={e}><p>file: {e}</p></li>
                )
            }) :
            myObj &&
            // --- DISPLAY FOLDERS ---
            Object.keys(currentFolder).map(e => {
                return (
                    <li key={e}>📁<Link to={`/${folders.length ? folders.join("/")+ "/" + e : e}`}>{e} </Link></li>
                )
            })
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
export default Homepage;


