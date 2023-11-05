import { getPost } from "../api";
import { useLoaderData } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";

import vertical_dots_icon from "../assets/3-vertical-dots.svg";
import report_icon from "../assets/report.png";
import edit_icon from "../assets/edit.png";
import bin_icon from "../assets/bin.png";
import share_icon from "../assets/bin.png";

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
				<h3 className="italic text-gray-500">Tutorial</h3>
				<h1 className="text-4xl text-gray-800 font-bold mb-4">{post.title}</h1>

				<p className="mb-4 text-gray-800">Posted on {post.created_at}</p>
				<div className="flex items-center gap-3">
					<img
						className="author-image w-14 h-14 object-cover rounded-full"
						src={post.author.avatar}
					/>
					<p className="text-lg text-gray-800">
						{post.author.username}
						<span className="text-orange-400">
							{post.is_author ? " (You)" : ""}
						</span>
					</p>
				</div>
				<nav className="mb-8 flex items-center justify-between">
					<Dropdown
						dismissOnClick={false}
						renderTrigger={() => (
							<button className="bg-gray-200 rounded-full w-6 h-6 mb-2 mt-4 p-1 hover:bg-gray-300 active:bg-gray-400">
								<img src={vertical_dots_icon}></img>
							</button>
						)}
					>
						<Dropdown.Item as={Link} className="flex items-center">
							<img src={report_icon} className="w-4 h-4 mr-2" />
							Report
						</Dropdown.Item>
						{post.is_author && (
							<>
								<Dropdown.Divider />
								<Dropdown.Item as={Link} className="flex items-center">
									<img src={edit_icon} className="w-4 h-4 mr-2" />
									Edit
								</Dropdown.Item>
								<Dropdown.Item as={Link} className="flex items-center">
									<img src={bin_icon} className="w-4 h-4 mr-2" />
									Delete
								</Dropdown.Item>
							</>
						)}
					</Dropdown>
				</nav>
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
