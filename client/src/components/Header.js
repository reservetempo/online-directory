import { Link } from "react-router-dom";
import styled from "styled-components";
import Signin from "./Signin";

const Header = () => {
    return (
        <StyledNav>
            <Link to="/">online-directory</Link>
            <Signin />
        </StyledNav>
    );
}

const StyledNav = styled.nav`
    border: 1px solid var(--primary);
    margin: 3px;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
`
export default Header;
