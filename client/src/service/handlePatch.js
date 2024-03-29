export const updateDirectory = async (id, updateObject, token) => {
    const result = await fetch(`https://online-directory-service.onrender.com/directories/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(updateObject)
    });
    return await result.json();
}
