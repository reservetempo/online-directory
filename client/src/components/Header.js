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
    border: 1px dashed blue;
`
export default Header;
