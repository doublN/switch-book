export const googleBookApi = async () => {
    const res = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=jane austen"
    );
    return res.volumeInfo.json();
};
