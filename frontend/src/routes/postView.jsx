import { getPost } from "../api";
import { useLoaderData } from "react-router-dom";
import { Dropdown } from "flowbite-react";
import { Link, Form } from "react-router-dom";

import vertical_dots_icon from "../assets/3-vertical-dots.svg";
import report_icon from "../assets/report.png";
import edit_icon from "../assets/edit.png";
import bin_icon from "../assets/bin.png";
import share_icon from "../assets/share.png";
import copy_icon from "../assets/link.png";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export async function loader({ request, params }) {
	const id = params.id;
	const posts_data = await getPost(id);
	return posts_data.data;
}

export default function PostView() {
	const post = useLoaderData();
	const [copyTxt, setCopyTxt] = useState("Copy");
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	return (
		<div id="post-view-container">
			<section></section>
			<section className="my-8 mx-20" id="detail-post-view">
				<div className="modals">
					<Modal
						show={showDeleteModal}
						size="md"
						onClose={() => setShowDeleteModal(false)}
						popup
					>
						<Modal.Header />
						<Modal.Body>
							<div className="text-center">
								<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
									Are you sure you want to delete this post?
								</h3>
								<div className="flex flex-col justify-center gap-4">
									<Button
										color="failure"
										onClick={() => setShowDeleteModal(false)}
									>
										Cancel
									</Button>
									<Form action="delete" method="post" className="w-full">
										<Button type="submit" color="gray" className="w-full">
											Delete
										</Button>
									</Form>
								</div>
							</div>
						</Modal.Body>
					</Modal>
				</div>
				<h3 className="italic text-gray-500">Tutorial</h3>
				<h1 className="text-4xl text-gray-800 font-bold mb-4">{post.title}</h1>
				<p className="text-gray-800 p-0">Posted on {post.created_at}</p>
				<nav className=" flex items-center gap-4 my-3">
					<Dropdown
						dismissOnClick={false}
						renderTrigger={() => (
							<img
								className="cursor-pointer rounded-full w-6 h-6 p-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
								src={share_icon}
							/>
						)}
					>
						<Dropdown.Item
							as="button"
							onClick={() => {
								navigator.clipboard.writeText(window.location.href);
								setCopyTxt("Copied!");
								setTimeout(() => {
									setCopyTxt("Copy");
								}, 2500);
							}}
							className="flex items-center bg-transparent"
						>
							<img src={copy_icon} className="w-4 h-4 mr-2" />
							<p>{copyTxt}</p>
						</Dropdown.Item>
					</Dropdown>
					<Dropdown
						dismissOnClick={true}
						renderTrigger={() => (
							<img
								className="cursor-pointer rounded-full w-6 h-6 p-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
								src={vertical_dots_icon}
							/>
						)}
					>
						<Dropdown.Item as={Link} className="flex items-center">
							<img src={report_icon} className="w-4 h-4 mr-2" />
							Report
						</Dropdown.Item>
						{post.is_author && (
							<>
								<Dropdown.Divider />
								<Dropdown.Item
									as={Link}
									to="edit/"
									className="flex items-center"
								>
									<img src={edit_icon} className="w-4 h-4 mr-2" />
									Edit
								</Dropdown.Item>
								<Dropdown.Item
									as="button"
									onClick={() => setShowDeleteModal(true)}
									className="flex items-center"
								>
									<img src={bin_icon} className="w-4 h-4 mr-2" />
									Delete
								</Dropdown.Item>
							</>
						)}
					</Dropdown>
				</nav>
				<div className="flex items-center gap-3 mb-8">
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
