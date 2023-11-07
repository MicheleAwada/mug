import axios from "axios";

function getTokenInHeader() {
	const token = getToken();
	if (token) {
		return { Authorization: `Token ${token}` };
	}
	return {};
}

function getToken() {
	return localStorage.getItem("token");
}

export function getPosts() {
	return axios.get("http://127.0.0.1:8000/api/posts/", {
		headers: getTokenInHeader(),
	});
}

export function getPost(id) {
	return axios.get(`http://127.0.0.1:8000/api/posts/${id}/`, {
		headers: getTokenInHeader(),
	});
}

export async function postPost(data) {
	try {
		const response = await axios.post(
			"http://127.0.0.1:8000/api/posts/",
			data,
			{ headers: getTokenInHeader() }
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}
export async function editPost(data, id) {
	try {
		const response = await axios.patch(
			`http://127.0.0.1:8000/api/posts/${id}/`,
			data,
			{ headers: getTokenInHeader() }
		);
		return response.data;
	} catch (error) {
		console.error(error);
		return false;
	}
}
