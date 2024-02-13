export const deleteImage = async (updateObject, token) => {
    const result = await fetch(`https://online-directory-service.onrender.com/images`, {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateObject)
    });
    return await result.json();
}
