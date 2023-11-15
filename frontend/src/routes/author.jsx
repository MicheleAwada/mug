import { Link, useLoaderData } from "react-router-dom";
import { getAuthor } from "../api";
import { short_nums } from "../utils";
import heart_filled from "../assets/heart filled.svg";

export async function loader({ params }) {
	const respone = await getAuthor(params.id);
	return respone.data;
}

export default function Author() {
	const author = useLoaderData();
	const posts = author.posts;
	return (
		<>
			<div className="w-full flex justify-center">
				<div className="flex m-8">
					<div className="flex items-center gap-3 ">
						<img
							className="author-image w-14 h-14 object-cover rounded-full"
							src={author.avatar}
						/>
						<div className="flex flex-col">
							<p className="text-lg">{author.name}</p>
							<p className="text-lg text-gray-500">@{author.username}</p>
						</div>
					</div>
					<div className="flex flex-col">
						<div className="flex items-center">
							<img className="w-6" src={heart_filled} />
							<p>{short_nums(author.likes) + " Likes"}</p>
						</div>
					</div>
				</div>
			</div>
			<div
				id="contents"
				className="flex flex-wrap justify-around items-stretch w-full"
			>
				{posts.map((post) => (
					<div className="post m-4 w-64" key={post.id}>
						<Link to={`/posts/${post.id}/`}>
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
		</>
	);
}
