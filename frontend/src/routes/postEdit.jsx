import {
	useActionData,
	useLoaderData,
	useOutletContext,
} from "react-router-dom";
import { editPost, getPost } from "../api";

import { PostPostForm } from "../components/postPostForm";

import Spinner from "../assets/spinner.svg";

export async function action({ request, params }) {
	const formData = await request.formData();
	const id = params.id;

	const image = formData.get("image");

	if (image.name === "") {
		formData.delete("image");
	}

	const result = await editPost(formData, id);

	if (result) {
		return [true, result];
	}
	console.log(result);
	return [false, result];
}

export async function loader({ params }) {
	const id = params.id;
	const posts_data = await getPost(id);
	return posts_data.data;
}
export default function PostEditView() {
	const loaderData = useLoaderData();
	const actionData = useActionData();
	const context = useOutletContext();
	const { simpleAddMessage } = context.messages;

	return (
		<PostPostForm
			actionData={actionData}
			create={false}
			defaults={loaderData}
			simpleAddMessage={simpleAddMessage}
		/>
	);
}
