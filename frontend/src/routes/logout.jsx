import { Form, redirect } from "react-router-dom";

export function action() {
	localStorage.clear("token");
	return redirect("/");
}

export default function Logout() {
	return (
		<div>
			are you sure u wanna logout boi
			<Form method="POST">
				<button type="submit">Logout</button>
			</Form>
		</div>
	);
}
