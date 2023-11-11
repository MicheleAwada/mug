import { useEffect } from "react";
import {
	Form,
	redirect,
	useActionData,
	useNavigate,
	useOutletContext,
} from "react-router-dom";

export function action() {
	localStorage.clear("token");
	return true;
}

export default function Logout() {
	const navigate = useNavigate();
	const context = useOutletContext();
	const {
		auth: [isAuthenticated, setIsAuthenticated],
		messages: { simpleAddMessage },
	} = context;
	const actionData = useActionData();
	useEffect(() => {
		if (actionData) {
			setIsAuthenticated(false);
			simpleAddMessage(
				"You have succesfully logged out",
				"success",
				"Success!"
			);
			navigate("/");
		}
	}, [actionData]);
	return (
		<div className="h-full flex items-center justify-center rounded-md">
			<Form
				method="delete"
				className="border-gray-300 border-2 rounded-md p-4 px-6 py-10"
			>
				<p className="mb-6 text-gray-700">Are you sure you want to logout?</p>
				<button
					type="sumbit"
					className="flex items-center h-8 gap-2 mx-auto py-1 px-4 text-white bg-amber-600 rounded-sm"
				>
					Logout
				</button>
			</Form>
		</div>
	);
}
