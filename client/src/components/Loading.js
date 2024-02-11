import styled from "styled-components";

const Loading = ({loading}) => {
    return (
        <>
        {loading && <StyledP>{loading}...</StyledP>}
        </>

    )
}

const StyledP = styled.p`
    clip-path: inset(0 3ch 0 0);
    animation: l 1s steps(4) infinite;
    display:inline-block;
    font-family: 'Courier New', Courier, monospace;
    @keyframes l {
    to {
        clip-path: inset(0 -1ch 0 0)
    }
    }
`
export default Loading