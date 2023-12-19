import axios, { isAxiosError } from "axios";
import { api } from "./api";
import { googleLogout } from '@react-oauth/google';


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
		user.type = "normal"
		setUser(token, user);
		return getAuthInfo();
	} catch (error) {
		let error_message = error.message
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
		user.type = "normal"
		setUser(token, user);
		return getAuthInfo();
	} catch (error) {
		const error_message = error.message
		try {const error_message = error.response.data.non_field_errors[0]}
		catch(e) {}
		return { is_authenticated: false, error: error_message, user: null };
	}
}

export function getAuthInfo() {
	const is_authenticated = localStorage.getItem("token") !== null;
	const stringified_user = localStorage.getItem("user");
	let user = JSON.parse(stringified_user);
	return { is_authenticated, user };
}

export async function getUser() {
	const auth_info = getAuthInfo();

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
		localStorage.removeItem("user")
	}

	return auth_info
}

export async function googlelogin(data) {
	try {
		const response = await api.post("/api/login/google/", data);
		const token = response.data.token;
		const user = response.data.user;
		user.type = "google"
		setUser(token, user);
		return getAuthInfo();
	} catch (error) {
		console.error(error)
		const error_message = error.message
		try {const error_message = error.response.data.non_field_errors[0]}
		catch(e) {}
		return { is_authenticated: false, error: error_message, user: null };
	}
}


export function logout() {
	localStorage.removeItem("token");
	
	const stringified_user = localStorage.getItem("user")
	const parsed_user = JSON.parse(stringified_user);
	const type = parsed_user.type
	localStorage.removeItem("user");

	if (type === "google") {
		googleLogout();
	}
	
	return true;
}

export async function changeInfo(formdata) {
	try {
		const old_user = getUser()
		const userid = old_user.id
		const response = await api.patch(`/api/user/${userid}/`, formdata)
		const user = response.data;
		const stringified_user = JSON.stringify(user)
		localStorage.setItem("user", stringified_user);
		return [true, user];
	} catch (error) {
		const error_message = error.message
		return [false, error.message];
	}
}

export function deleteAccount() {
	try {
		const user = getUser()
		const userid = user.id
		const response = api.delete(`/api/user/${userid}/`)
		logout()
		return true
	} catch (error) {
		return false
	}
}