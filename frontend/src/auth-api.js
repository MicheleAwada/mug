import axios from "axios";

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
		console.error("error while authenticating");
		console.error(error);
		return false;
	}
}

export function isAuthenticated() {
	console.log(localStorage.getItem("token") !== null);
	return localStorage.getItem("token") !== null;
}
