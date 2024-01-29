export const addImage = async (formData, branch, token) => {
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

export const updateImage = async (branch, text, token) => {
    
    const result = await fetch(`/images/${branch}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({text})
    });
    return await result.json();
}