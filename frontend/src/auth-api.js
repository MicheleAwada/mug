import axios from "axios";

export function getToken() {
	return localStorage.getItem("token");
}

export function getTokenInHeader() {
	const token = getToken();
	if (token) {
		return { Authorization: `Token ${token}` };
	}
	return {};
}

export async function login(username, password) {
	try {
		const response = await axios.post("http://127.0.0.1:8000/api/token-auth/", {
			username,
			password,
		});
		const token = response.data.token;
		localStorage.setItem("token", token);
		return true;
	} catch (error) {
		console.error("error Invalid username or password");
		return false;
	}
}

export function checkAuthenticated() {
	return localStorage.getItem("token") !== null;
}

export async function getUser() {
	if (checkAuthenticated()) {
		try {
			const response = await axios.get("http://127.0.0.1:8000/api/user/", {
				headers: getTokenInHeader(),
			});
			console.log(response.data);
			return response.data;
		} catch (error) {
			console.error(error);
			return false;
		}
	}
	return null;
}
