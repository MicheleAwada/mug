import axios from "axios";

export function getSession() {
	fetch("http://127.0.0.1:8000/api/session/", {
		credentials: "same-origin",
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.isAuthenticated) {
				return true;
			} else {
				return false;
			}
		})
		.catch((err) => {
			console.log(err);
		});
}

export function getCSRF() {
	return fetch("http://127.0.0.1:8000/api/csrf/", {
		credentials: "same-origin",
	});
	// .then((res) => {
	// 	console.log("csrf");
	// 	console.log(res);
	// 	const csrfToken = res.headers.values();
	// 	console.log(csrfToken);
	// 	return csrfToken;
	// })
	// .catch((err) => {
	// 	console.log("error");
	// 	console.log(err);
	// });
}

export async function login(username, password) {
	const csrfTokenFetch = await getCSRF();
	const responseJson = await csrfTokenFetch.json();
	const csrfToken = responseJson["X-CSRFToken"];
	console.log("what your waiting for");
	console.log(csrfToken);
	fetch("http://127.0.0.1:8000/api/login/", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-CSRFToken": csrfToken,
		},
		credentials: "same-origin",
		body: JSON.stringify({
			username: "michele",
			password: "TestNest1",
		}),
	})
		.then(isResponseOk)
		.then((data) => {
			console.log(data);
			return true;
		})
		.catch((err) => {
			console.log(err);
			return false;
			// ({ error: "Wrong username or password." });
		});
}

export async function logout() {
	fetch("http://127.0.0.1:8000/api/logout", {
		credentials: "same-origin",
	})
		.then(isResponseOk)
		.then((data) => {
			console.log(data);
			return false;
		})
		.catch((err) => {
			console.log(err);
		});
}

export function whoami() {
	fetch("http://127.0.0.1:8000/api/whoami/", {
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "same-origin",
	})
		.then((res) => res.json())
		.then((data) => {
			console.log("You are logged in as: " + data.username);
		})
		.catch((err) => {
			console.log(err);
		});
}

function isResponseOk(response) {
	if (response.status >= 200 && response.status <= 299) {
		return response.json();
	} else {
		throw Error(response.statusText);
	}
}
