import { useLoaderData, Link, useOutletContext } from "react-router-dom";
import { getPosts } from "../api.js";

//debug
function getRandomElement(input1, input2) {
	const randomIndex = Math.random() < 0.5 ? 0 : 1;
	return randomIndex === 0 ? input1 : input2;
}

export async function loader({ request }) {
	const posts = await getPosts();
	return posts.data;
}

export default function PostsListView() {
	const posts = useLoaderData();
	const context = useOutletContext();
	const { simpleAddMessage } = context.messages;
	return (
		<div
			id="contents"
			className="flex flex-wrap justify-around items-stretch w-full"
		>
			{/* debug */}
			<button
				onClick={() =>
					simpleAddMessage(
						getRandomElement("test", "sheep"),
						getRandomElement("success", "warning"),
						getRandomElement("Success!", "BATAATA")
					)
				}
			>
				Addd messsagesss
			</button>
			{posts.map((post) => (
				<div className="post m-4 w-64" key={post.id}>
					<Link to={`posts/${post.id}`}>
						<img
							className="object-cover w-full h-32 rounded-t-lg"
							src={post.thumbnail}
						/>
						<div className="bg-gray-100 rounded-b-lg p-4">
							<h1 className="truncate-title">{post.title}</h1>
						</div>
					</Link>
				</div>
			))}
		</div>
	);
}
