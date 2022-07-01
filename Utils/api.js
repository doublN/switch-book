import axios from "axios";

export const googleBooksAPI = axios.create({
  baseURL: "https://www.googleapis.com/books/v1/volumes?q=jane austen",
});
