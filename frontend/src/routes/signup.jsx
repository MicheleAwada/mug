import { Form, useNavigate } from "react-router-dom";
import Google from "../assets/google.svg";
import Meta from "../assets/meta.svg";
import Spinner from "../assets/spinner.svg";
import { useEffect, useState } from "react";
import { useActionData, useOutletContext } from "react-router-dom";
import { signup } from "../auth-api";
import HrText from "../components/hr-text";
import { redirect } from "react-router-dom";

import auth_illustration from "../assets/auth illustration.svg";

export async function action({ request, params }) {
	const formData = await request.formData();
	const isAuthenticated = await signup(formData);
	return isAuthenticated;
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
	const [error, setError] = useState(null);
	const actionData = useActionData();
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
				setError(
					<p className="text-red-500 text-center my-3">{actionData.error}</p>
				);
			}
		}
	}, [actionData]);

	return (
		<>
			<div className="h-full flex items-center justify-around w-full overflow-hidden w-full">
				<img
					src={auth_illustration}
					className="h-[30rem] w-auto hidden lg:block"
				/>
				<Form
					onSubmit={() => setLoading(true)}
					method="POST"
					className="border-gray-300 border-2 rounded-md p-4 mx-8"
				>
					<legend className="text-2xl mb-6 ml-2 mt-2 text-gray-800">
						Hello, Sign up
					</legend>
					{/* <div className="flex flex-row flex-wrap content-stretch items-stretch justify-center gap-4 mb-4">
						<a className="border-gray-200 border-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 cursor-pointer flex items-center gap-2 h-8 py-6 px-3 rounded-md">
							<img src={Google} alt="Google" className="h-8" />
							Sign up With Google
						</a>
						<a className="border-gray-200 border-2 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 text-gray-700 cursor-pointer flex items-center gap-2 h-8 py-6 px-3 rounded-md">
							<img src={Meta} alt="Meta" className="h-8" />
							Sign up With Meta
						</a>
					</div>
					<HrText /> */}
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
						Signup
					</button>
					<hr />
					<a
						href="/login/"
						className="text-center bg-cyan-500 text-white py-1 px-2 block mt-4 mb-2 rounded-md"
					>
						Login to account instead?
					</a>
				</Form>
			</div>
		</>
	);
}
