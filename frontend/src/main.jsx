import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Root, { loader as rootLoader } from "./routes/root";

import PostsListView, {
	loader as postsListViewLoader,
} from "./routes/postsListView";
import PostView, { loader as postViewLoader } from "./routes/postView";
import PostCreateView, {
	action as postCreateAction,
} from "./routes/postCreate";
import PostEditView, {
	action as postEditAction,
	loader as postEditLoader,
} from "./routes/postEdit";
import { action as postDeleteAction } from "./routes/postDelete";

import Login, { action as loginAction } from "./routes/login";
import Logout, { action as logoutAction } from "./routes/logout";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
		loader: rootLoader,
		children: [
			{
				index: true,
				element: <PostsListView />,
				loader: postsListViewLoader,
			},
			{
				path: "posts/:id/",
				element: <PostView />,
				loader: postViewLoader,
			},
			{
				path: "posts/create/",
				element: <PostCreateView />,
				action: postCreateAction,
			},
			{
				path: "posts/:id/edit/",
				element: <PostEditView />,
				action: postEditAction,
				loader: postEditLoader,
			},
			{
				path: "posts/:id/delete/",
				action: postDeleteAction,
			},
			{
				path: "login/",
				element: <Login />,
				action: loginAction,
			},
			{
				path: "logout/",
				element: <Logout />,
				action: logoutAction,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
