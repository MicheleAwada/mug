import { useLoaderData, Outlet } from "react-router-dom";
import Header from "../components/header";
import React from "react";

import { isAuthenticated } from "../auth-api";

export default function Root() {
	return (
		<>
			<div id="root-divider">
				<Header isAuthenticated={isAuthenticated()} />
				<Outlet />
			</div>
		</>
	);
}
