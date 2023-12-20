import { Form, Link, useNavigate } from "react-router-dom";
import Spinner from "../assets/spinner.svg";
import React, { useEffect, useState } from "react";
import { useActionData, useOutletContext } from "react-router-dom";
import { signup } from "../auth-api";
import HrText from "../components/hr-text";
import { redirect } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"
import { return_auth_feedback_functions } from "./login";

import auth_illustration from "../assets/auth illustration.svg";

import { getNestedProperty } from "../utils";

export async function action({ request, params }) {
	const formData = await request.formData();
	const isAuthenticated = await signup(formData);
	return isAuthenticated;
}

export function ErrorTextObj({main_obj, child}) {
	if (main_obj === undefined) {
		return null
	}
	const errors = getNestedProperty(main_obj, child)
	if (errors === undefined || !Array.isArray(errors) || errors.length === 0) {
		return null
	}
	if (errors.some((obj) => {
		if (typeof obj === "string") {
			return false
		}
		return true
	})) {return null}
	const errorList = (<ul className="list-disc px-4">{errors.map((error) => {
		return <li key={error}>
			<p className="text-red-500">{error}</p>
		</li>
	})}</ul>)
	return errorList
	
}

export default function Signup() {
	const navigate = useNavigate();
	const context = useOutletContext();
	const {
		auth: [isAuthenticated, setIsAuthenticated],
		user: [currentUser, setCurrentUser],
		messages: { simpleAddMessage },
	} = context;
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({});
	const actionData = useActionData();

	const { success_login, failed_login, google_handle_success, google_handle_error } = return_auth_feedback_functions(setIsAuthenticated, setCurrentUser, simpleAddMessage, navigate)

	useEffect(() => {
		if (actionData) {
			setLoading(false);
			if (actionData.is_authenticated) {
				setIsAuthenticated(actionData.is_authenticated);
				setCurrentUser(actionData.user);
				simpleAddMessage(
					"You have succesfully Signed up",
					"success",
					"Success!"
				);
				navigate("/");
			} else {
				setError({...actionData.error});
			}
		}
	}, [actionData]);

	const ErrorText = ({ child }) => <ErrorTextObj main_obj={actionData === undefined ? {} : actionData.error} child={child} />

	return (
		<>
			<div className="h-full flex items-center justify-around overflow-hidden w-full">
				<img
					src={auth_illustration}
					className="h-[30rem] w-auto hidden lg:block"
				/>
				<Form
					onSubmit={() => setLoading(true)}
					method="POST"
					className="border-gray-300 border-2 rounded-md p-4 mx-8 flex flex-col items-center"
				>
					<legend className="text-2xl mb-6 ml-2 mt-2 text-gray-800">
						Hello, Start Your Journey
					</legend>
					<GoogleLogin
							onSuccess={google_handle_success}
							onError={google_handle_error}
						/>
					<div className="mb-4" />
					<HrText />
					<fieldset className="flex flex-col">
						<div className="flex flex-col lg:flex-row lg:justify-between lg:gap-4">
							<div className="flex flex-col">
								<label className="text-gray-700" htmlFor="name">
									Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="bg-gray-50 p-2 rounded-md mb-3 border-gray-200 border-2 outline-0"
									required
								></input>
								<ErrorText child="name" />
							</div>
							<div className="flex flex-col">
								<label className="text-gray-700" htmlFor="email">
									Email
								</label>
								<input
									type="text"
									name="email"
									id="email"
									className="bg-gray-50 p-2 rounded-md mb-3 border-gray-200 border-2 outline-0"
									required
								></input>
								<ErrorText child="email" />
							</div>
						</div>
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
						<ErrorText child="username" />
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
						<ErrorText child="password" />
					</fieldset>
					<ErrorText child="non_field_errors" />
					<ErrorText child="" />
					<button
						type="sumbit"
						className="flex items-center h-8 gap-2 w-full justify-center my-6 py-1 px-4 text-white bg-[#deab28] hover:bg-[#d48f00] active:bg-[#c78910] rounded-md"
					>
						<img
							src={Spinner}
							alt="loading"
							className={(loading ? "animate-spin" : "hidden") + " h-full"}
						/>
						Signup
					</button>
					<hr />
					<Link
						to="/login/"
						className="text-center bg-cyan-500 text-white py-1 px-2 block mt-4 mb-2 rounded-md w-full"
					>
						Login to account instead?
					</Link>
				</Form>
			</div>
		</>
	);
}
