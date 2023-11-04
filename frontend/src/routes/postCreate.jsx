import { Form, redirect } from "react-router-dom";
import { postPost } from "../api";

export async function action({ request, params }) {
	const formData = await request.formData();

	const result = await postPost(formData);
	if (result) {
		return redirect(`/posts/${result.id}`);
	}
	return result;
}

export default function PostCreateView() {
	return (
		<div className="flex-grow">
			<Form method="POST" action="" encType="multipart/form-data">
				<label htmlFor="title">Title</label>
				<input type="text" name="title" id="title" />
				<label htmlFor="body">Body</label>
				<input type="text" name="body" id="body" />
				<label htmlFor="image">Image</label>
				<input type="file" name="image" id="image" />

				<button type="submit">Submit</button>
			</Form>
		</div>
	);
}
