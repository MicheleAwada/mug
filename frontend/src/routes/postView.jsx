import { getPost } from "../api";
import { useLoaderData } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import vertical_dots from "../assets/3-vertical-dots.svg";

export async function loader({ request, params }) {
	const id = params.id;
	const posts_data = await getPost(id);
	console.log(posts_data);
	return posts_data.data;
}

export default function PostView() {
	const post = useLoaderData();
	return (
		<div id="post-view-container">
			<section></section>
			<section className="my-8 mx-20" id="detail-post-view">
				<div className="flex justify-between items-start">
					<h3 className="italic text-gray-500">Tutorial</h3>
					<Dropdown
						dismissOnClick={false}
						renderTrigger={() => (
							<button className="bg-gray-300 rounded-full w-6 h-6 p-1">
								<img src={vertical_dots}></img>
							</button>
						)}
					>
						<Dropdown.Item as={Link} href="#">
							Report
						</Dropdown.Item>
						{post.is_author && (
							<>
								<Dropdown.Divider />
								<Dropdown.Item>Report</Dropdown.Item>
								<Dropdown.Item>Edit</Dropdown.Item>
								<Dropdown.Item>Delete</Dropdown.Item>
							</>
						)}
					</Dropdown>
				</div>
				<h1 className="text-4xl text-gray-800 font-bold mb-4">{post.title}</h1>
				<p className="mb-4 text-gray-800">Posted on {post.created_at}</p>
				<div className="flex items-center gap-3 mb-8">
					<img
						className="author-image w-14 h-14 object-cover rounded-full"
						src={post.author.avatar}
					/>
					<p className="text-lg text-gray-800">
						{post.author.username + (post.is_author ? "(You)" : "")}
					</p>
					{post.is_author}
				</div>

				<img
					className="post-image object-cover mx-auto rounded-md mb-8"
					src={post.image}
				/>
				<p className="mx-3 text-gray-800 text-justify">{post.body}</p>
				<section>
					<hr />
					<p>
						{post.comments.length}{" "}
						{post.comments.length === 1 ? "comment" : "comments"}
					</p>
					<hr />
					{post.comments.map((comment) => (
						<div>
							<div className="flex items-center gap-3">
								<img
									className="author-image w-8 h-8 object-cover rounded-full"
									src={comment.author.avatar}
								/>
								<p className="text-lg text-gray-800">
									{comment.author.username}
								</p>
							</div>
							<div>
								<p>{comment.body}</p>
							</div>
						</div>
					))}
				</section>
			</section>
			<section></section>
		</div>
	);
}
