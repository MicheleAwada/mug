import axios, { isAxiosError } from "axios";
import { api } from "./api";

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
function setUser(token, user) {
	const stringified_user = JSON.stringify(user);
	localStorage.setItem("token", token);
	localStorage.setItem("user", stringified_user);
	return { token: token, user: user };
}
export async function signup(data) {
	try {
		const response = await api.post("/api/user/", data);
		const token = response.data.token;
		const parsed_user = response.data.user;
		const user = JSON.stringify(parsed_user);
		return setUser(token, user);
	} catch (error) {
		let error_message = error.message
		console.log(error)
		try {error_message = error.response.data}
		catch(e) {}
		return { is_authenticated: false, error: error_message, user: null };
	}
}
export async function login(data) {
	try {
		const response = await api.post("/api/login/", data);
		const token = response.data.token;
		const user = response.data.user;
		return setUser(token, user);
	} catch (error) {
		const error_message = error.message
		try {const error_message = error.response.data.non_field_errors[0]}
		catch(e) {}
		return { is_authenticated: false, error: error_message, user: null };
	}
}

export async function getAuthInfo() {
	const is_authenticated = localStorage.getItem("token") !== null;
	const stringified_user = localStorage.getItem("user");
	let user = JSON.parse(stringified_user);
	return { is_authenticated, user };
}

export async function getUser() {
	const auth_info = await getAuthInfo();

	//weird sceneros
	if (auth_info.is_authenticated && !auth_info.user) {
		try {
			const response = await api.get("/api/user/", {
				headers: getTokenInHeader(),
			});
			const user = response.data;
			const stringified_user = JSON.stringify(user)
			localStorage.setItem("user", stringified_user);
			return response.data;
		} catch (error) {
			return false;
		}
	} else if (!auth_info.is_authenticated && auth_info.user) {
		localStorage.clear("user")
	}
	return auth_info
}

export function googlelogin(data) {
	try {
		const response = api.post("/api/login/google/", data);
		const token = response.data.token;
		const user = response.data.user;
		return setUser(token, user);
	} catch (error) {
		const error_message = error.message
		try {const error_message = error.response.data.non_field_errors[0]}
		catch(e) {}
		return { is_authenticated: false, error: error_message, user: null };
	}
}