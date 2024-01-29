import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
:root{
    --primary: #fff;
    --secondary: #000;
}

body, a{
    margin: 0;
    background-color: var(--secondary);
    color: var(--primary);
}

body, button {
    font-family: 'Courier New', Courier, monospace;
}
li {
    list-style: none;
}
button{
    background-color: var(--secondary);
    padding: 0.2rem;
    border: 1px solid var(--primary);
    color: var(--primary);
}

`;