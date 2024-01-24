import styled from "styled-components";
import { useCurrentUser } from "./UserContext";

const ImageViewer = ({image}) => {

    const { currentDirectory } = useCurrentUser();
    console.log({image})
    return (
        <div>
            <h1>{image.title}</h1>
            <StyledImg src={image.imgSrc} />
        </div>
    )
}

const StyledImg = styled.img`
    width: 90vw;
`

export default ImageViewer