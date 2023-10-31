import { getPost } from "../api";
import { useLoaderData } from "react-router-dom";
export async function loader({ request, params }) {
	const id = params.id;
	const posts_data = await getPost(id);
	console.log(posts_data);
	return posts_data.data;
}

export default function PostView() {
	const post = useLoaderData();
	return (
		<div id="post-container">
			<section></section>
			<section className="my-8 mx-20" id="detail-post-view">
				{/* TODO : add type */}
				<h3 className="italic text-gray-500">Tutorial</h3>
				<h1 className="text-4xl text-gray-800 font-bold mb-4">{post.title}</h1>
				<p className="mb-4 text-gray-800">Posted on {post.created_at}</p>
				{/* TODO : add author */}
				<div className="flex items-center gap-3 mb-8">
					<img
						className="author-image w-14 h-14 object-cover rounded-full"
						src="http://placekitten.com/200/201"
					/>
					<p className="text-lg text-gray-800">Author Name</p>
				</div>

				<img
					className="post-image object-cover mx-auto rounded-md mb-8"
					src="https://blog.hubspot.com/hs-fs/hubfs/how-to-start-coding-1.jpg?width=595&height=400&name=how-to-start-coding-1.jpg"
				/>
				<p className="mx-3 text-gray-800 text-justify">{post.body}</p>
			</section>
			<section></section>
		</div>
	);
}
