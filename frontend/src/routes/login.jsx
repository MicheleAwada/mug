import { Form } from "react-router-dom";
import { login } from "../auth-api";

export function action({ request, params }) {
	login();
	return null;
}

export default function Login() {
	return (
		<div id="login-main-div" className="flex justify-center items-center">
			<Form
				action="/login"
				method="POST"
				className="bg-gray-100 border-gray-300 border-2 border-solid p-8 rounded-xl min-w-[33.33%]"
			>
				<legend className="font-bold text-xl mb-2 text-center">Login</legend>
				<br />
				<fieldset className="flex flex-col">
					<label htmlFor="username">Username</label>
					<input
						className="my-2 p-2 bg-gray-200 border-gray-400 border-2 rounded-md w-full"
						type="text"
						id="username"
						name="username"
						required
					></input>
					<label htmlFor="password">Password</label>
					<input
						className="my-2 p-2 bg-gray-200 border-gray-400 border-2 rounded-md w-full"
						type="password"
						id="password"
						name="password"
						required
					></input>
				</fieldset>
				<button
					type="sumbit"
					className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-amber-100 mt-8 mx-auto rounded-full box-border px-6 py-2 w-full"
				>
					Login
				</button>
			</Form>
		</div>
	);
}
