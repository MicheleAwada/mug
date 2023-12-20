import axios, { isAxiosError } from "axios";
import { api } from "./api";
import { googleLogout } from '@react-oauth/google';

import { attempValuesOfObject, getNestedProperty } from "./utils";

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
		console.log('good')
		console.log(response)
		const token = response.data.token;
		const user = response.data.user;
		user["type"] = "normal"
		setUser(token, user);
		return getAuthInfo();
	} catch (error) {
		console.log(error)
		error = attempValuesOfObject(error, "response.data", "message")
		return { is_authenticated: false, error: error, user: null };
	}
}
export async function login(data) {
	try {
		const response = await api.post("/api/login/", data);
		const token = response.data.token;
		const user = response.data.user;
		user["type"] = "normal"
		setUser(token, user);
		return getAuthInfo();
	} catch (error) {
		console.log(error)
		const error_message = attempValuesOfObject(error, "response.data.non_field_errors.0", "message")
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
		user["type"] = "google"
		setUser(token, user);
		return getAuthInfo();
	} catch (error) {
		const error_message = attempValuesOfObject(error, "response.data.status", "message")
		return { is_authenticated: false, error: error_message, user: null };
	}
}


export function logout(force=false) {
	
	if (!force) {
		const stringified_user = localStorage.getItem("user")
		const parsed_user = JSON.parse(stringified_user);
		
		if (parsed_user.type === "google") {
			googleLogout();
		}
	} else {
		googleLogout();
	}
	localStorage.removeItem("token");
	localStorage.removeItem("user");
	
	return true;
}

export async function changeInfo(formdata) {
	try {
		const auth_info = await getUser()
		const user = auth_info.user
		const response = await api.patch(`/api/user/${user.id}/`, formdata)
		const new_user = response.data;
		const stringified_user = JSON.stringify(new_user)
		localStorage.setItem("user", stringified_user);
		return [true, new_user];
	} catch (error) {
		console.log(error)
		const error_message = attempValuesOfObject(error, "response.data", "message")
		console.log(error_message)
		return [false, error_message];
	}
}

export async function deleteAccount() {
	try {
		const auth_info =  await getUser()
		const user = auth_info.user
		const response = await api.delete(`/api/user/${user.id}/`)
		logout()
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

export async function changePassword(data) {
	try {
		const auth_info =  getUser()
		const user = auth_info.user
		const response = await api.post('/api/dj-rest-auth/password/change/', data)
		return true
	} catch (error) {
		console.error(error)
		return false
	}
}

// export async function resetPassword(data) {
// 	try {
// 		const response = await api.post("/api/dj-rest-auth/password/reset/", data)
// 		return true
// 	} catch (error) {
// 		console.error(error)
// 		return false
// 	}
// }