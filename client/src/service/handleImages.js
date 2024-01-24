export const addImage = async (formData, branch, token) => {
    console.log(formData.path)
    console.log(token)
    const result = await fetch(`/images/${branch}`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
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