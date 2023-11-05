import { Form, useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
import Meta from "../assets/meta.svg";
import Spinner from "../assets/spinner.svg";
import { useEffect, useState } from "react";
import { useActionData, useOutletContext } from "react-router-dom";
import { login } from "../auth-api";
import HrText from "../components/hr-text";
import { redirect } from "react-router-dom";

import login_illustration from "../assets/login illustration.svg";

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
			<p className="text-red-500 text-center my-3">
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
			<div className="flex-grow flex items-center justify-around">
				<Form
					onSubmit={() => setLoading(true)}
					method="POST"
					className="border-gray-300 border-2 rounded-md p-4 ml-8 flex-grow-1"
				>
					<legend className="text-2xl mb-6 ml-2 mt-2 text-gray-800">
						Welcome Back
					</legend>
					<div className="flex flex-row flex-wrap content-stretch items-stretch justify-center gap-4 mb-4">
						<a className="border-gray-100 border-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 cursor-pointer flex items-center gap-2 h-8 py-6 px-3 rounded-md">
							<img src={Google} alt="Google" className="h-8" />
							Login With Google
						</a>
						<a className="border-gray-100 border-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 cursor-pointer flex items-center gap-2 h-8 py-6 px-3 rounded-md">
							<img src={Meta} alt="Meta" className="h-8" />
							Login With Meta
						</a>
					</div>
					<HrText />
					<fieldset className="flex flex-col">
						<label className="text-gray-700" htmlFor="username">
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="bg-gray-50 p-2 rounded-md mb-3 border-gray-100 border-2 outline-0"
							required
						></input>
						<label className="text-gray-700" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							className="bg-gray-50 p-2 rounded-md border-gray-100 border-2 outline-0"
							required
						></input>
					</fieldset>
					{error}
					<button
						type="sumbit"
						className="flex items-center h-8 gap-2 w-full justify-center my-6 py-1 px-4 text-white bg-[#deab28] hover:bg-[#d48f00] active:bg-[#c78910] rounded-md"
					>
						<img
							src={Spinner}
							alt="loading"
							className={(loading ? "animate-spin" : "hidden") + " h-full"}
						/>
						Login
					</button>
					<hr />
					<a
						href="signup/"
						className="text-center bg-cyan-500 text-white py-1 px-2 block mt-4 mb-2 rounded-md"
					>
						Create a account instead?
					</a>
				</Form>
				<img
					src={login_illustration}
					className="h-[30rem] w-auto hidden lg:block"
				/>
			</div>
		</>
	);
}
