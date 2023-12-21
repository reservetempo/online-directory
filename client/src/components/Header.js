import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
    return (
        <StyledNav>
            <p>online-directory</p>
        </StyledNav>
    );
}

const StyledNav = styled.nav`
    border: 1px dashed blue;
`
export default Header;
