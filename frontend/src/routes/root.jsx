import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";

import { getAuthInfo, getUser } from "../auth-api";

export function loader() {
	return getUser();
}

export default function Root() {
	const loaderData = useLoaderData();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(loaderData);
	useEffect(() => {
		const auth_info = getAuthInfo();
		setIsAuthenticated(auth_info.is_authenticated);
		setCurrentUser(auth_info.user);
	}, []);
	return (
		<>
			<div id="root-divider">
				<Header
					context={{
						auth: [isAuthenticated, setIsAuthenticated],
						user: [currentUser, setCurrentUser],
					}}
				/>
				<Outlet
					context={{
						auth: [isAuthenticated, setIsAuthenticated],
						user: [currentUser, setCurrentUser],
					}}
				/>
			</div>
		</>
	);
}
