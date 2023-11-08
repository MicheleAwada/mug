import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";

import { checkAuthenticated, getUser } from "../auth-api";

export function loader() {
	return getUser();
}

export default function Root() {
	const loaderData = useLoaderData();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [currentUser, setCurrentUser] = useState(loaderData);
	useEffect(() => {
		setIsAuthenticated(checkAuthenticated());
	}, []);
	return (
		<>
			<div id="root-divider">
				<Header auth={[isAuthenticated, setIsAuthenticated]} />
				<Outlet context={{ auth: [isAuthenticated, setIsAuthenticated] }} />
			</div>
		</>
	);
}
