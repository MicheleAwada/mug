import axios from "axios";

export function login() {
	axios
		.post("http://127.0.0.1:8000/login/", requestData, {
			headers,
			withCredentials: true,
		})
		.then((response) => {
			if (response.status === 200) {
				console.log("GOOD");
			} else {
				console.log("BAD");
			}
		})
		.catch((error) => {
			console.log("ERROR");
		});
}
