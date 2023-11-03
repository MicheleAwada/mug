import { useLoaderData, Outlet } from "react-router-dom";
import Header from "../components/header";
import React from "react";

export default function Root() {
	return (
		<>
			<div id="root-divider">
				<Header />
				<Outlet />
			</div>
		</>
	);
}
