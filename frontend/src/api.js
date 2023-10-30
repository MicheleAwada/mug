import axios from "axios"



export function getPosts() {
    return axios
        .get("http://127.0.0.1:8000/api/posts/")
}
export function getPost(id) {
    return axios
        .get(`http://127.0.0.1:8000/api/posts/${id}/`)
}