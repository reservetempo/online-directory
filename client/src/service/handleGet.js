export const getDirectory = async (_id) => {
    const result = await fetch(`/directories/${_id}`);
    return await result.json();
};

export const getDirectories = async () => {
    const result = await fetch(`https://online-directory-service.onrender.com/directories`);
    return await result.json();
};

export const getDescription = async ({id}) => {
    console.log(id)
    const result = await fetch(`/images/${id}`);
    return await result.json();
};