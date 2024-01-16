export const updateDirectory = async (id, updateObject) => {
    const result = await fetch(`/directories/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updateObject)
    });
    return await result.json();
}
