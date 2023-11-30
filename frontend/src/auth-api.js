import axios from "axios";
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

export async function signup(data) {
	try {
		const response = await api.post("/api/user/", data);
		const token = response.data.token;
		const parsed_user = response.data.user;
		const user = JSON.stringify(parsed_user);
		localStorage.setItem("token", token);
		localStorage.setItem("user", user);

		return { is_authenticated: true, user: parsed_user };
	} catch (error) {
		const error_message = error.message
		try {const error_message = error.response.data.non_field_errors[0]}
		catch(e) {}
		return { is_authenticated: false, error: error_message, user: null };
	}
}
export async function login(data) {
	try {
		const response = await api.post("/api/login/", data);
		const token = response.data.token;
		const parsed_user = response.data.user;
		const user = JSON.stringify(parsed_user);
		localStorage.setItem("token", token);
		localStorage.setItem("user", user);
		return { is_authenticated: true, user: parsed_user };
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
	const user = JSON.parse(stringified_user);
	return { is_authenticated, user };
}

export async function getUser() {
	if (getAuthInfo().is_authenticated) {
		try {
			const response = await api.get("/api/user/", {
				headers: getTokenInHeader(),
			});
			return response.data;
		} catch (error) {
			return false;
		}
	}
	return null;
}

