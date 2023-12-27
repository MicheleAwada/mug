import { getPost, comment, like, deletePostFromCache } from "../api";
import { redirect, useLoaderData, useOutletContext } from "react-router-dom";
import { Dropdown, Tooltip } from "flowbite-react";
import { Link, Form } from "react-router-dom";

import vertical_dots_icon from "../assets/3-vertical-dots.svg";
import report_icon from "../assets/report.png";
import edit_icon from "../assets/edit.png";
import bin_icon from "../assets/bin.png";
import share_icon from "../assets/share.png";
import copy_icon from "../assets/link.png";
import heart from "../assets/heart.svg";
import heart_filled from "../assets/heart filled.svg";

import { Button, Modal, Radio, Label, Textarea } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { short_nums } from "../utils";

export async function loader({ request, params }) {
	const id = params.id;
	const posts_data = await getPost(id);
	return posts_data.data;
}

export async function action({ request, params }) {
	const postId = params.id;
	const formData = await request.formData();
	formData.append("post", postId);
	await comment(formData);
	deletePostFromCache(postId);
	return redirect(`/posts/${postId}/`);
}

export default function PostView() {
	const context = useOutletContext();
	const post = useLoaderData();
	const [isAuthenticated, setIsAuthenticated] = context.auth;
	const { simpleAddMessage } = context.messages;
	const [copyTxt, setCopyTxt] = useState("Copy");
	const [showCommentForm, setShowCommentForm] = useState(false);

	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showReportModal, setShowReportModal] = useState(false);
	const [reportCommentId, setReportCommentId] = useState(0);
	return (
		<section
			className="my-8 px-6 sm:px-8 md:px-10 lg:px-14 xl:px-20 w-screen h-full"
			id="detail-post-view"
		>
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
				<Modal
					show={showReportModal}
					size="md"
					onClose={() => setShowReportModal(false)}
					popup
				>
					<Modal.Header />
					<Modal.Body>
						<div className="text-center">
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
								Report {reportCommentId === 0 ? "Post" : "Comment"}
							</h3>

							<Form
								action={
									reportCommentId === 0
										? "report/"
										: `report/${reportCommentId}`
								}
								method="post"
								className="w-full"
								onSubmit={() => setShowReportModal(false)}
							>
								<div className="flex flex-col gap-8">
									<div className="flex flex-wrap gap-x-6 gap-y-2 content-center">
										<div className="flex items-center gap-2">
											<Radio name="type" value="spam" id="spam" required />
											<Label htmlFor="spam">Spam</Label>
										</div>
										<div className="flex items-center gap-2">
											<Radio name="type" value="abuse" id="abuse" required />
											<Label htmlFor="abuse">Abuse</Label>
										</div>
										<div className="flex items-center gap-2">
											<Radio name="type" value="sexual" id="sexual" required />
											<Label htmlFor="sexual">Sexual Content</Label>
										</div>
										<div className="flex items-center gap-2">
											<Radio
												name="type"
												value="inappropriate"
												id="inappropriate"
												required
											/>
											<Label htmlFor="inappropriate">
												Inappropriate Content
											</Label>
										</div>
										<div className="flex items-center gap-2">
											<Radio name="type" value="other" id="other" required />
											<Label htmlFor="other">Other</Label>
										</div>
									</div>
									<Textarea
										id="extra-report-info"
										placeholder="Care to tell us more?"
										rows={2}
										name="name"
									/>
									<div className="flex items-center justify-end gap-4">
										<Button
											type="button"
											onClick={() => setShowReportModal(false)}
											color="gray"
											className="w-20"
										>
											Cancel
										</Button>
										<Button className="w-20" color="failure" type="sumbit">
											Report
										</Button>
									</div>
								</div>
							</Form>
						</div>
					</Modal.Body>
				</Modal>
			</div>
			<h3 className="italic text-gray-500">Tutorial</h3>
			<h1 className="text-4xl text-gray-800 font-bold mb-4">{post.title}</h1>
			<p className="text-gray-800 p-0">Posted on {post.created_at}</p>
			<nav className=" flex items-center gap-4 my-3">
				<Form action={`/posts/${post.id}/like/`} method="post">
					<button
						type={isAuthenticated ? "sumbit" : "button"}
						className="h-6 rounded-full bg-gray-200 p-1 flex items-center gap-2 px-2"
						onClick={
							isAuthenticated
								? () => {}
								: () => {
										simpleAddMessage("Please login to like posts", "error");
								  }
						}
					>
						<p className="text-gray-950">{short_nums(post.likes)}</p>
						<img
							className="w-4 h-4"
							src={post.is_liked ? heart_filled : heart}
							alt={post.is_liked ? "UnLike" : "Like"}
						/>
					</button>
				</Form>
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
					<Dropdown.Item
						as="button"
						onClick={() => {
							if (!isAuthenticated) {
								simpleAddMessage("Please login to report posts", "error");
								return;
							}
							setReportCommentId(0);
							setShowReportModal(true);
						}}
						className="flex items-center"
					>
						<img src={report_icon} className="w-4 h-4 mr-2" />
						Report
					</Dropdown.Item>
					{post.is_author && (
						<>
							<Dropdown.Divider />
							<Dropdown.Item as={Link} to="edit/" className="flex items-center">
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
			<Link
				to={`/author/${post.author.id}/`}
				className="flex items-center gap-3 mb-8"
			>
				<img
					className="author-image w-14 h-14 object-cover rounded-full"
					src={post.author.avatar}
				/>
				<div className="flex flex-col">
					<p className="text-lg">{post.author.name}</p>
					<p className="text-lg text-gray-500">@{post.author.username}</p>
					<span className="text-orange-400">
						{post.is_author ? " (You)" : ""}
					</span>
				</div>
			</Link>
			<img
				className="post-image object-cover mx-auto rounded-md mb-8"
				src={post.image}
			/>
			<div className="px-3 w mb-16 w-full block">
				<p
					className="text-gray-800 w-full"
					style={{
						whiteSpace: "pre-wrap",
						textOverflow: "ellipsis",
						overflowWrap: "break-word",
					}}
				>
					{post.body}
				</p>
			</div>
			<section>
				<hr />
				<p className="ml-8 my-4 text-lg">
					{post.comments.length}{" "}
					{post.comments.length === 1 ? "comment" : "comments"}
				</p>
				<Form
					className="bg-gray-50 rounded-md border-2 border-gray-200 p-0 mb-4"
					method="post"
				>
					{isAuthenticated ? (
						<textarea
							rows={showCommentForm ? "3" : "1"}
							className="border-none bg-transparent w-full p-4 resize-none hide-outline text-gray-800 rounded-md "
							disabled={!isAuthenticated}
							id="comment-body"
							name="body"
							placeholder="Write your comment here"
							onFocus={() => setShowCommentForm(true)}
						></textarea>
					) : (
						<Tooltip
							content="You must Login first to comment"
							style="light"
							arrow
						>
							<textarea
								rows={showCommentForm ? "3" : "1"}
								className="border-none bg-transparent w-full p-4 resize-none hide-outline text-gray-800 placeholder-gray-400 rounded-md "
								disabled={!isAuthenticated}
								id="comment-body"
								name="body"
								placeholder="Write your comment here"
								onFocus={() => setShowCommentForm(true)}
								onBlur={() => setShowCommentForm(false)}
							></textarea>
						</Tooltip>
					)}

					<div className={"buttons " + (showCommentForm ? "" : " hidden")}>
						<button
							className="bg-gray-400 hover:bg-gray-500 acitve:bg-gray-600
								text-white p-2 px-4 m-2 rounded-md"
							onClick={() => setShowCommentForm(false)}
							type="button"
						>
							Cancel
						</button>
						<button
							type="sumbit"
							className="bg-blue-500 hover:bg-blue-600 acitve:bg-blue-700
								text-white p-2 px-4 m-2 rounded-md"
						>
							Comment
						</button>
					</div>
				</Form>
				<ul className="comments gap-4 flex flex-col m-0 p-0">
					{post.comments.map((comment) => (
						<div
							className="bg-gray-50 rounded-md border-2 border-gray-200 p-4"
							key={comment.id}
						>
							<div className="flex items-center justify-between gap-2 mb-3">
								<Link
									to={`/author/${comment.author.id}/`}
									className="flex items-center gap-2 mb-3"
								>
									<img
										className="author-image w-8 h-8 object-cover rounded-full"
										src={comment.author.avatar}
									/>
									<p className="text-lg text-gray-800">
										{comment.author.username}
									</p>
								</Link>
								<div className="flex items-center gap-2">
									<Form
										action={`/posts/${post.id}/like/${comment.id}/`}
										method="post"
									>
										<button
											type={isAuthenticated ? "sumbit" : "button"}
											className="h-6 rounded-full bg-gray-200 p-1 px-2 flex items-center gap-2"
											onClick={
												isAuthenticated
													? () => {}
													: () => {
															simpleAddMessage(
																"Please login to like posts",
																"error"
															);
													  }
											}
										>
											<p className="text-gray-950">
												{short_nums(comment.likes)}
											</p>
											<img
												className="w-4 h-4"
												src={comment.is_liked ? heart_filled : heart}
												alt={comment.is_liked ? "UnLike" : "Like"}
											/>
										</button>
									</Form>
									<Dropdown
										dismissOnClick={true}
										renderTrigger={() => (
											<img
												className="cursor-pointer rounded-full w-6 h-6 p-1 bg-gray-200 hover:bg-gray-300 active:bg-gray-400"
												src={vertical_dots_icon}
											/>
										)}
									>
										<Dropdown.Item
											as="button"
											onClick={() => {
												if (!isAuthenticated) {
													simpleAddMessage(
														"Please login to report posts",
														"error"
													);
													return;
												}
												setReportCommentId(comment.id);
												setShowReportModal(true);
											}}
											className="flex items-center"
										>
											<img src={report_icon} className="w-4 h-4 mr-2" />
											Report
										</Dropdown.Item>
										{comment.is_author && (
											<>
												<Dropdown.Divider />
												<Dropdown.Item className="flex items-center">
													<img src={edit_icon} className="w-4 h-4 mr-2" />
													Edit
												</Dropdown.Item>
												<Dropdown.Item
													// as="button"
													// onClick={() => setShowDeleteModal(true)}
													className="flex items-center"
												>
													<img src={bin_icon} className="w-4 h-4 mr-2" />
													Delete
												</Dropdown.Item>
											</>
										)}
									</Dropdown>
								</div>
							</div>
							<div className="px-3 w mb-16 w-full block">
								<p
									className="text-gray-800 w-full"
									style={{
										whiteSpace: "pre-wrap",
										textOverflow: "ellipsis",
										overflowWrap: "break-word",
									}}
								>
									{comment.body}
								</p>
							</div>
						</div>
					))}
				</ul>
			</section>
		</section>
	);
}
