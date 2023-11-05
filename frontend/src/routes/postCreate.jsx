import { Form, redirect, useActionData } from "react-router-dom";
import { postPost } from "../api";
import { Textarea } from "flowbite-react";
import { useEffect, useState } from "react";

import Spinner from "../assets/spinner.svg";

export async function action({ request, params }) {
	const formData = await request.formData();

	const result = await postPost(formData);
	if (result) {
		return [true];
	}
	console.log(result)
	return [false, result];
}

export default function PostCreateView() {
	const actionData = useActionData();
	// const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const error =
	actionData ? (
		<p className="text-red-500 text-center my-3">
			{actionData}
		</p>
	) : null;

	useEffect(() => {
		if (actionData !== undefined) {
			setLoading(false);
		}
		if (actionData) {
			navigate("/");
		}
	}, [actionData]);

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
				<fieldset className="flex flex-col">
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						className="bg-gray-100 p-2 rounded-sm mb-3 border-gray-200 border-2 outline-0"
						required
					></input>
					<textarea
						type="text"
						name="body"
						id="body"
						className="bg-gray-100 p-2 rounded-sm border-gray-200 border-2 outline-0 mb-3"
						placeholder="Write your body here"
						rows={10}
						required
					></textarea>
			
					<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
					<input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

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
