export const addImage = async (formData, branch) => {
    const result = await fetch(`/images/${branch}`, {
        method: "POST",
        body: formData
    });
    return await result.json();
}

export const getImages = async () => {
    const result = await fetch(`/images`)
    return await result.json();
}