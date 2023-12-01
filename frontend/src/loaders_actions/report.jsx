import { redirect } from "react-router-dom";
import { report } from "../api";

export async function actionReportPost({ request, params }) {
    const post_id = params.id;
    const formData = await request.formData();
    console.log("wtf")
	formData.append("post", post_id);
	const response = report(formData);
	return redirect(`/posts/${post_id}/`);
}
export async function actionReportComment({ request, params }) {
    const comment_id = params.comment_id;
	const post_id = params.id;
    const formData = await request.formData();
	formData.append("comment", comment_id);
	const response = report(formData);
	return redirect(`/posts/${post_id}/`);
}
