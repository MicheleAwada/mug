import { useLoaderData, Link, useOutletContext } from "react-router-dom";
import { getPosts } from "../api.js";

export async function loader() {
	const posts = await getPosts();
	return posts.data;
}

export default function PostsListView() {
	const posts = useLoaderData();
	return (
		<div
			id="contents"
			className="flex flex-wrap justify-around items-stretch w-full"
		>
			{posts.map((post) => (
				<Link to={`/posts/${post.id}/`} className="post m-4 w-64" key={post.id}>
					<img
						className="object-cover w-full h-32 rounded-t-lg"
						src={post.thumbnail}
					/>
					<div className="bg-gray-100 rounded-b-lg p-4">
						<h1 className="truncate-title">{post.title}</h1>
					</div>
				</Link>
			))}
		</div>
	);
}
