export const addProduct = async (formData) => {
    const result = await fetch("/images", {
        method: "POST",
        body: formData
    });
    return await result.json();
}

export const getProducts = async () => {
    const result = await fetch(`/products`)
    return await result.json();
}