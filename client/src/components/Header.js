import { Link } from "react-router-dom";
import styled from "styled-components";
import Signin from "./Signin";

const Header = () => {
    return (
        <StyledNav>
            <p>online-directory</p>
            <Signin />
        </StyledNav>
    );
}

const StyledNav = styled.nav`
    border: 1px solid var(--primary);
    margin: 3px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
export default Header;
