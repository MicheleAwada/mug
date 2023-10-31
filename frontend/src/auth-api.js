import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function login() {
	const csrfToken = cookies.get("csrftoken");
	console.log(`csrfToken: ${csrfToken}`);
	// Define the request data
	const requestData = {
		username: "michele",
		password: "TestNest1",
	};

	// Define the request headers, including the CSRF token
	const headers = {
		"Content-Type": "application/json",
		"X-CSRFToken": csrfToken,
	};

	axios
		.post("http://127.0.0.1:8000/login/", {
			requestData,
			headers: headers,
			withCredentials: true,
		})
		.then((response) => {
			if (response.status === 200) {
				console.log("GOOD");
				return true;
			} else {
				console.log("BAD");
				return false;
			}
		})
		.catch((error) => {
			console.log("ERROR");
			return false;
		});
}
