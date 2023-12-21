export const getDirectory = async (_id) => {
    const result = await fetch(`/directories/${_id}`);
    return await result.json();
  };