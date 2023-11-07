import {
	Form,
	redirect,
	useActionData,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { editPost, getPost } from "../api";
import { Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

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
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	let error = null;
	if (actionData !== undefined) {
		error = actionData[0] ? null : (
			<p className="text-red-500 text-center my-3">{actionData[0]}</p>
		);
	}

	useEffect(() => {
		if (actionData !== undefined) {
			setLoading(false);
			if (actionData[0]) {
				navigate(`/posts/${actionData[1].id}`);
			}
		}
	}, [actionData]);

	const [fieldDefault] = useState({
		title: loaderData.title,
		body: loaderData.body,
	});

	console.log(`THISSSSSSSS ${loaderData.image}`);

	return (
		<div className="flex-grow flex ">
			<Form
				method="POST"
				id="post-create-form"
				className=" rounded-sm p-4 mt-6 mx-8"
				encType="multipart/form-data"
				onSubmit={() => {
					setLoading(true);
				}}
			>
				<legend className="text-3xl">Edit Post</legend>
				<fieldset className="flex flex-col">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						className="bg-gray-100 p-2 rounded-sm mb-3 border-gray-200 border-2 outline-0"
						required
						defaultValue={fieldDefault.title}
					></input>
					<textarea
						type="text"
						name="body"
						id="body"
						className="bg-gray-100 p-2 rounded-sm border-gray-200 border-2 outline-0 mb-3"
						placeholder="Write your body here"
						rows={10}
						required
						defaultValue={fieldDefault.body}
					></textarea>

					<label
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="image_input"
					>
						Upload file
					</label>
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						id="image_input"
						type="file"
						name="image"
					/>
				</fieldset>
				<button
					type="sumbit"
					className="flex items-center justify-center h-8 gap-2 w-full my-6 py-1 px-4 text-white bg-amber-600 rounded-sm"
				>
					<img
						src={Spinner}
						alt="loading"
						className={
							(loading ? "animate-spin cursor-not-allowed" : "hidden") +
							" h-full"
						}
					/>
					Post
				</button>
				{error}
			</Form>
		</div>
	);
}
