import { Form, useNavigate, useNavigation } from "react-router-dom";
import Loading from "./loading";
import { useEffect } from "react";
import { Tooltip } from "flowbite-react";


export function PostPostForm({
	actionData,
	create = true,
	defaults = null,
	simpleAddMessage,
	isAuthenticated = true,
}) {
	const navigate = useNavigate();
	const navigation = useNavigation();
	const showLoading = navigation.state === "submitting";
	let error = null;
	if (actionData !== undefined) {
		error = actionData[0] ? null : (
			<p className="text-red-500 text-center my-3">{actionData[0]}</p>
		);
	}

	useEffect(() => {
		if (actionData !== undefined) {
			if (actionData[0]) {
				if (create) {
					simpleAddMessage("Post created", "success", "Success!");
				} else {
					simpleAddMessage("Post edited", "success", "Success!");
				}
				navigate(`/posts/${actionData[1].id}`);
			}
		}
	}, [actionData]);

	return (
		<div className="flex-grow flex ">
			<Form
				method="POST"
				id="post-create-form"
				className=" rounded-sm p-4 mt-6 mx-8"
				encType="multipart/form-data"
			>
				<fieldset className="flex flex-col">
					<label htmlFor="title">Title{create && "*"}</label>
					<input
						type="text"
						name="title"
						id="title"
						className="bg-gray-100 p-2 rounded-sm mb-3 border-gray-200 border-2 outline-0"
						defaultValue={defaults && defaults.title}
						required
					></input>
					<textarea
						type="text"
						name="body"
						id="body"
						className="bg-gray-100 p-2 rounded-sm border-gray-200 border-2 outline-0 mb-3"
						placeholder={"Write your body here" + (create && "*")}
						rows={10}
						defaultValue={defaults && defaults.body}
						required
					></textarea>

					<label
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						htmlFor="post_create_image_input"
					>
						Upload file{create && "*"}
					</label>
					<input
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						id="post_create_image_input"
						type="file"
						name="image"
						required={create}
					/>
				</fieldset>
				{isAuthenticated ? 
				<button
					type="sumbit"
					className="flex items-center justify-center h-8 gap-2 w-full my-6 py-1 px-4 text-white bg-amber-600 rounded-sm"
					disabled={showLoading}
				>
					<Loading show={showLoading} />
					{create ? "Post" : "Edit"}
				</button> : <div className="w-full">
					<Tooltip
					content="You must be logged in to post"
					style="light"
					arrow
					>
						<button
							type="sumbit"
							className="flex items-center justify-center h-8 gap-2 w-full my-6 py-1 px-4 text-white bg-amber-600 rounded-sm"
							disabled
						>
							{create ? "Post" : "Edit"}
						</button>
					</Tooltip>
				</div>}
				{error}
			</Form>
		</div>
	);
}
