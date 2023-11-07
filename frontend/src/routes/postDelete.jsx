import { deletePost } from "../api";
import { redirect } from "react-router-dom";

export function action({ params }) {
	const id = params.id;
	deletePost(id);
	return redirect("/");
}
