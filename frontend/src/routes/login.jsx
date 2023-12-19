import { Form, useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
import Meta from "../assets/meta.svg";
import Spinner from "../assets/spinner.svg";
import { useEffect, useState } from "react";
import { useActionData, useOutletContext } from "react-router-dom";
import { login, googlelogin } from "../auth-api";
import HrText from "../components/hr-text";
import { redirect } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"

import auth_illustration from "../assets/auth illustration.svg";

export async function action({ request, params }) {
	const formData = await request.formData();
	const response = await login(formData);
	return response;
}


export default function Login() {
	const navigate = useNavigate();
	const context = useOutletContext();
	const {
		auth: [isAuthenticated, setIsAuthenticated],
		user: [currentUser, setCurrentUser],
		messages: { simpleAddMessage },
	} = context;
	const [loading, setLoading] = useState(false);
	const actionData = useActionData();
	const [error, setError] = useState(null);

	const { success_login, failed_login, google_handle_success, google_handle_error } = return_auth_feedback_functions(setIsAuthenticated, setCurrentUser, simpleAddMessage, navigate)
	useEffect(() => {
		if (actionData) {
			setLoading(false);
			if (actionData.is_authenticated) {
				success_login(actionData.is_authenticated, actionData.user, navigate);
			} else {
				failed_login(actionData.is_authenticated, actionData.user);
				setError(
					<p className="text-red-500 text-center my-3">{actionData.error}</p>
				);
			}
		}
	}, [actionData]);

	return (
		<>	
			<div className="h-full flex items-center justify-around w-full overflow-hidden">
				<div className="flex-grow flex items-center justify-around w-full">
					<Form
						onSubmit={() => setLoading(true)}
						method="POST"
						className="border-gray-300 border-2 rounded-md p-4 mx-8"
					>
						<legend className="text-2xl mb-6 ml-2 mt-2 text-gray-800">
							Welcome Back
						</legend>
						<GoogleLogin
							onSuccess={google_handle_success}
							onError={google_handle_error}
						/>
						<div className="pb-3" />
						<HrText />
						<fieldset className="flex flex-col">
							<label className="text-gray-700" htmlFor="username">
								Username
							</label>
							<input
								type="text"
								name="username"
								id="username"
								className="bg-gray-50 p-2 rounded-md mb-3 border-gray-200 border-2 outline-0"
								required
							></input>
							<label className="text-gray-700" htmlFor="password">
								Password
							</label>
							<input
								type="password"
								name="password"
								id="password"
								className="bg-gray-50 p-2 rounded-md border-gray-200 border-2 outline-0"
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
						<Link
							href="/signup/"
							className="text-center bg-cyan-500 text-white py-1 px-2 block mt-4 mb-2 rounded-md"
						>
							Create a account instead?
						</Link>
					</Form>
					<img
						src={auth_illustration}
						className="h-[30rem] w-auto hidden lg:block"
					/>
				</div>
			</div>
		</>
	);
}


export function return_auth_feedback_functions(setIsAuthenticated, setCurrentUser, simpleAddMessage, navigate) {
	function success_login(is_auth, user) {
		setIsAuthenticated(is_auth);
		setCurrentUser(user);
		simpleAddMessage(
			"You have succesfully Logged in",
			"success",
			"Success! "
		);
		navigate("/")
	}
	function failed_login(is_auth, user) {
		setIsAuthenticated(is_auth);
		setCurrentUser(user);
		simpleAddMessage(
			"Their was an error loggin you in",
			"error",
			"Whops! "
		);
	}
	async function google_handle_success(response) {
		const g = await googlelogin(response);
		if (!g.is_authenticated) {
			return failed_login(g.is_authenticated, g.user);
		}
		return success_login(g.is_authenticated, g.user);
	}
	function google_handle_error() {
		simpleAddMessage(
			"Their was an error on google's side",
			"error",
			"Whops! "
		)
	}
	return {
		success_login,
		failed_login,
		google_handle_success,
		google_handle_error
	}
}