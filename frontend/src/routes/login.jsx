import { Form, useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
import Meta from "../assets/meta.svg";
import Spinner from "../assets/spinner.svg";
import { useEffect, useState } from "react";
import { useActionData, useOutletContext } from "react-router-dom";
import { login } from "../auth-api";

import { redirect } from "react-router-dom";

export async function action({ request, params }) {
	console.log(params);
	const formData = await request.formData();
	const username = formData.get("username");
	const password = formData.get("password");
	const isAuthenticated = await login(username, password);
	if (isAuthenticated) {
		return true;
	}
	return false;
}

export default function Login() {
	const navigate = useNavigate();
	const context = useOutletContext();
	const {
		auth: [isAuthenticated, setIsAuthenticated],
	} = context;
	const [loading, setLoading] = useState(false);
	const actionData = useActionData();
	const error =
		actionData === false ? (
			<p className="text-red-500 text-center mb-8">
				Invalid username or password
			</p>
		) : null;
	useEffect(() => {
		if (actionData !== undefined) {
			setLoading(false);
		}
		if (actionData) {
			setIsAuthenticated(actionData);
			navigate("/");
		}
	}, [actionData]);

	return (
		<>
			<div className="flex-grow flex items-center justify-center">
				<Form
					onSubmit={() => setLoading(true)}
					method="POST"
					className="border-gray-300 border-2 rounded-sm p-4"
				>
					<fieldset className="flex flex-col">
						<label htmlFor="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							className="bg-gray-100 p-2 rounded-sm mb-3 border-gray-200 border-2 outline-0"
							required
						></input>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							className="bg-gray-100 p-2 rounded-sm border-gray-200 border-2 outline-0"
							required
						></input>
					</fieldset>
					<button
						type="sumbit"
						className="flex items-center h-8 gap-2 mx-auto my-6 py-1 px-4 text-white bg-amber-600 rounded-sm"
					>
						<img
							src={Spinner}
							alt="loading"
							className={(loading ? "animate-spin" : "hidden") + " h-full"}
						/>
						Login
					</button>
					{error}
					<div className="flex flex-row flex-wrap content-stretch items-stretch justify-center gap-4 mb-4">
						<a className="bg-gray-100 text-gray-800 cursor-pointer flex items-center gap-2 h-8 py-6 px-3 rounded-sm">
							<img src={Google} alt="Google" className="h-8" />
							Login With Google
						</a>
						<a className="bg-gray-100 text-gray-800 cursor-pointer flex items-center gap-2 h-8 py-6 px-3 rounded-sm">
							<img src={Meta} alt="Meta" className="h-8" />
							Login With Meta
						</a>
					</div>
					<a href="signup/" className="text-center block mt-4">
						Create a account instead?
					</a>
				</Form>
			</div>
		</>
	);
}
