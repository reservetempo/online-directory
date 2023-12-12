import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    return (
        <StyledNav>
            <Link to={"/"}><h1>project transparency</h1></Link>
            <Link to={"/signin"}>sign in</Link>
            <Link to={"/list"}>list</Link>
            <Link to={"/vote"}>vote</Link>
        </StyledNav>
    );
}

const StyledNav = styled.nav`
    background-color: lightblue;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`

export default Header;
