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
    margin-bottom: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    a {
        text-decoration: none;
        border-bottom: 1px solid white;
    }
`
export default Header;
