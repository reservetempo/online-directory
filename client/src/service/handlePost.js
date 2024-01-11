export const makeDirectory = async (newUserObject) => {
    console.log("NEW USER OBJ:", newUserObject)
    const result = await fetch("/directories", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUserObject)
    });
    return await result.json();
}