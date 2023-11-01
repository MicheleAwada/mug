import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./routes/root";

import PostsListView, {
	loader as postsListViewLoader,
} from "./routes/postsListView";
import PostView, { loader as postViewLoader } from "./routes/postView";

import Login, { action as loginAction } from "./routes/login";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Root />,
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
				path: "login/",
				element: <Login />,
				action: loginAction,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
