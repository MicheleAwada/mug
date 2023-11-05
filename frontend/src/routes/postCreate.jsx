import { Form, redirect, useActionData } from "react-router-dom";
import { postPost } from "../api";
import { Textarea } from "flowbite-react";
import { useState } from "react";

import Spinner from "../assets/spinner.svg";

export async function action({ request, params }) {
	const formData = await request.formData();

	const result = await postPost(formData);
	if (result) {
		return redirect(`/posts/${result.id}`);
	}
	return result;
}

export default function PostCreateView() {
	const actionData = useActionData();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	if (actionData) {
		setError(actionData);
	}
	return (
		<div className="flex-grow flex ">
			<Form
				method="POST"
				id="post-create-form"
				className=" rounded-sm p-4 mt-6 mx-8"
				encType="multipart/form-data"
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
					<div className="flex items-center justify-center w-full">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<svg
									className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 20 16"
								>
									<path
										stroke="currentColor"
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
									/>
								</svg>
								<p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
									<span className="font-semibold">Click to upload</span> or drag
									and drop
								</p>
								<p className="text-xs text-gray-500 dark:text-gray-400">
									PNG, JPG, or SVG
								</p>
							</div>
							<input
								id="dropzone-file"
								type="file"
								name="image"
								className="hidden"
							/>
						</label>
					</div>
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
