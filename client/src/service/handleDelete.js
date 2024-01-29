export const deleteImage = async (updateObject, token) => {
    const result = await fetch(`/images`, {
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
