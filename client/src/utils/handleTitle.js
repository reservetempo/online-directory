export const handleTitle = (value) => {
    let newTitle = value;
    if (value[value.length -1] === " ") {
        newTitle = value.slice(0, value.length -1) + "_";
    }
    return newTitle;
}