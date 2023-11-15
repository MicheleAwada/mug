import axios from "axios";
import { getTokenInHeader } from "./auth-api";

// PROD change domain_name
const domain_name = "http://127.0.0.1:8000";

const api = axios.create({
	baseURL: domain_name,
	headers: getTokenInHeader(),
});

// this allows for dynamic headers so if a user logs in their token would be found in the header since it actually calls
// the function everytime
api.interceptors.request.use((config) => {
	const token = getTokenInHeader();
	config.headers = {
		...config.headers,
		...token,
	};
	return config;
});

export { api };

export function getPosts() {
	return api.get("/api/posts/");
}

export function getPost(id) {
	return api.get(`/api/posts/${id}/`);
}

export async function postPost(data) {
	try {
		const response = await api.post("/api/posts/", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}
export async function editPost(data, id) {
	try {
		const response = await api.patch(`/api/posts/${id}/`, data);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function deletePost(id) {
	try {
		const response = await api.delete(`/api/posts/${id}/`);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function comment(data) {
	try {
		const response = await api.post("/api/comments/", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function like(type, id) {
	try {
		const data = { object_id: id, object_type: type };
		const response = await api.post("/api/like/", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export function getAuthor(id) {
	try {
		const response = api.get(`/api/user/${id}/`);
		return response;
	} catch (error) {
		console.error(error);
		return false;
	}
}
