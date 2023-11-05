import { Outlet } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";

import { checkAuthenticated } from "../auth-api";

export default function Root() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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
