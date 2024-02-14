import { createGlobalStyle } from "styled-components";
export default createGlobalStyle`
:root{
    --primary: #fff;
    --secondary: #000;
}

.App {
    max-width: 700px;
    /* width: 100%; */
    margin: 20px;
}

body, a{
    margin: 0;
    background-color: var(--secondary);
    color: var(--primary);
}

body, button, input {
    font-family: 'Courier New', Courier, monospace;
    font-size: large;
}
li {
    list-style: none;
}
button{
    background-color: var(--secondary);
    cursor: pointer;
    border: none;
    color: var(--primary);
}
button:hover, a:hover {
    background-color: white;
    color: black;
}

`;