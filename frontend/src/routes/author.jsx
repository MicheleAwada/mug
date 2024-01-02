import {
	Form,
	Link,
	redirect,
	useLoaderData,
	useOutletContext,
} from "react-router-dom";
import { getAuthor } from "../api";
import { short_nums } from "../utils";
import heart_filled from "../assets/heart filled.svg";

import { follow } from "../api";

import Button from "../components/button";

export async function loader({ params }) {
	const respone = await getAuthor(params.id);
	return respone.data;
}

export async function action({ request, params }) {
	const response = await follow(params.id);
	return redirect(`/author/${params.id}/`);
}

export default function Author() {
	const author = useLoaderData();
	const posts = author.posts;
	const are_posts_empty = posts.length === 0;
	const context = useOutletContext();
	const [currentUser] = context.user;
	const [isAuthenticated] = context.auth;

	const isCurrentUser = (isAuthenticated && currentUser.id || -1) === author.id;
	return (
		<>
			<div className="w-full flex flex-wrap justify-center">
				<div className="flex flex-wrap justify-center m-8 gap-6">
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
					<div className="flex flex-wrap items-center gap-4">
						<div className="flex flex-col">
							<div className="flex items-center">
								<img className="w-6" src={heart_filled} />
								<p>{short_nums(author.likes) + " Likes"}</p>
							</div>
							<div>
								<p>{short_nums(posts.length) + " Posts"}</p>
							</div>
						</div>
						<div className="flex flex-col">
							<div>
								<p>{short_nums(author.following) + " Following"}</p>
							</div>
							<div>
								<p>{short_nums(author.followers) + " Followers"}</p>
							</div>
						</div>
						{isCurrentUser ? (
									<Button
										as={Link}
										to="/posts/create/"
										color="cyan"
									>
										Create Post
									</Button>
							) : isAuthenticated ? (								
								<Form method="post">
									<Button
										type="submit"
										color="cyan"	
									>
										{author.is_followed ? "Unfollow" : "Follow"}
									</Button>
								</Form>
							) : (<></>)
							}
					</div>
				</div>
			</div>
			<div
				id="contents"
				className="flex flex-wrap justify-around items-stretch w-full"
			>
				{are_posts_empty ?  (
					<p>No Posts {isCurrentUser && (<a href="/posts/create/">Create One?</a>)}</p>
				) : posts.map((post) => (
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
