export const makeDirectory = async (newUserObject, token) => {
    const result = await fetch("/directories", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newUserObject)
    });
    return await result.json();
}