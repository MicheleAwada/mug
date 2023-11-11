import axios from "axios";
import { api } from "./api";
import { loadConfigFromFile } from "vite";

export function getToken() {
	return localStorage.getItem("token");
}

export function getTokenInHeader() {
	console.log("WHAT YOU NEEED BABY");
	const token = getToken();
	if (token) {
		return { Authorization: `Token ${token}` };
	}
	return {};
}

export async function signup(data) {
	try {
		const response = await axios.post("http://127.0.0.1:8000/api/user/", data);
		const token = response.data.token;
		const user = response.data.user;
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));

		return { is_authenticated: true, user };
	} catch (error) {
		console.log(error);
		console.error(error.response.data);
		return { is_authenticated: false, error: error.response.data, user: null };
	}
}
export async function login(data) {
	try {
		const response = await axios.post(
			"http://127.0.0.1:8000/api/token-auth/",
			data
		);
		const token = response.data.token;
		localStorage.setItem("token", token);
		return true;
	} catch (error) {
		console.error("error Invalid username or password");
		return false;
	}
}

export function getAuthInfo() {
	const is_authenticated = localStorage.getItem("token") !== null;
	const user = localStorage.getItem("user");
	user = JSON.parse(user);
	return { is_authenticated, user };
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
