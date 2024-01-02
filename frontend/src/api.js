import axios from "axios";
import { getTokenInHeader } from "./auth-api";

import { attempValuesOfObject, getNestedProperty } from "./utils";

const domain_name = "https://backend.mug.micheleawada.com";

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

let posts_cache = {};

export function getPosts() {
	const posts = api.get("/api/posts/");
	return posts;
}

export function getPost(id) {
	if (posts_cache[id]) {
		return posts_cache[id];
	}
	const post = api.get(`/api/posts/${id}/`);
	posts_cache[post.id] = post;
	return post;
}
export function deletePostFromCache(id) {
	if (posts_cache[id]) {
		delete posts_cache[id];
		return true;
	}
	return false;
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
		return response.data.body;
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

export function follow(id) {
	try {
		const response = api.post(`/api/follow/`, { user_id: id });
		return response;
	} catch (error) {
		console.error(error);
		return false;
	}
}

export async function report(data) {
	try {
		const response = await api.post("/api/report/", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}
