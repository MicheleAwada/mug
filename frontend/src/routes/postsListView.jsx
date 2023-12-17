import { useLoaderData, Link, useOutletContext } from "react-router-dom";
import { getPosts } from "../api.js";

export async function loader() {
	const posts = await getPosts();
	return posts.data;
}

export default function PostsListView() {
	const posts = useLoaderData();
	const are_posts_empty = posts.length===0
	return (
		are_posts_empty ? 
		<div
		id="contents"
		className="flex flex-wrap justify-around items-stretch w-full"
		><p className="text-2xl pt-16">Weird?! Their doesnt seem to be any posts here.. <a href="/posts/create/">Create One?</a></p>
		</div> :
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
