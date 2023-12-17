import {
	Form,
	redirect,
	useActionData,
	useNavigate,
	useOutletContext,
} from "react-router-dom";
import { postPost } from "../api";
import { Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { PostPostForm } from "../components/postPostForm";

import Spinner from "../assets/spinner.svg";

export async function action({ request, params }) {
	const formData = await request.formData();

	const result = await postPost(formData);
	if (result) {
		return [true, result];
	}
	return [false, result];
}

export default function PostCreateView() {
	const actionData = useActionData();
	const context = useOutletContext();
	const [isAuthenticated] = context.auth;
	const { simpleAddMessage } = context.messages;
	return (
		<PostPostForm
			actionData={actionData}
			create={true}
			simpleAddMessage={simpleAddMessage}
			isAuthenticated={isAuthenticated}
		/>
	);
}
