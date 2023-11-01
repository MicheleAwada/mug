import { useLoaderData, Outlet } from "react-router-dom";
import Header from "../components/header";
import React from "react";

import { getSession } from "../auth-api";

export default class Root extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
		};
	}

	componentDidMount() {
		const isAuthenticated = getSession();
		this.setState({ isAuthenticated });
		console.log(this.state);
	}

	render() {
		return (
			<>
				<div id="root-divider">
					<Header state={this.state.isAuthenticated} />
					<Outlet />
				</div>
			</>
		);
	}
}
