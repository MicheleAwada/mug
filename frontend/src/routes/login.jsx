import { Form, useLoaderData } from "react-router-dom";
import { login, getCSRF } from "../auth-api";
import Google from "../assets/google.svg";
import Meta from "../assets/meta.svg";

export function loader() {
	return getCSRF();
}

export async function action({ request, params }) {
	const formData = await request.formData();
	const username = formData.get("username");
	const password = formData.get("password");
	login();
	console.log(username);
	console.log(pass);
	return null;
}

export default function Login() {
	const csrfToken = useLoaderData();
	return (
		<>
			<div className="flex-grow flex items-center justify-center">
				<Form
					method="POST"
					action=""
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
						className="block mx-auto my-6 py-1 px-4 text-white bg-amber-600 rounded-sm"
					>
						Login
					</button>
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
