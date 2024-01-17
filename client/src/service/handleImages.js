export const addImage = async (formData, branch, token) => {
    const result = await fetch(`/images/${branch}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });
    return await result.json();
}

export const getImages = async () => {
    const result = await fetch(`/images`)
    return await result.json();
}