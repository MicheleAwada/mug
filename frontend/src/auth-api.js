export async function login(username, password) {
	const token = btoa(`${username}:${password}`);
	try {
		const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
			method: "POST",
			credentials: "include",
			headers: {
				Authorization: `Basic ${token}`,
			},
		});
		const data = await response.json();
		const user = await models.userSchema.validate(data);
		setAppContext((ctx) => ({ ...ctx, user }));
	} catch (error) {
		console.error(error);
	}
}
