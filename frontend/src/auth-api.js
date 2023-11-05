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
		console.error("error Invalid username or password");
		return false;
	}
}

export function checkAuthenticated() {
	return localStorage.getItem("token") !== null;
}
