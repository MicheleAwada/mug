import { redirect } from "react-router-dom";
import { like } from "../api";

export async function actionPostLike({ request, params }) {
	const post_id = params.id;
	const response = like("post", post_id);
	return redirect(`/posts/${post_id}/`);
}
export async function actionCommentLike({ request, params }) {
	const comment_id = params.comment_id;
	const post_id = params.id;
	const response = like("comment", comment_id);
	return redirect(`/posts/${post_id}/`);
}
