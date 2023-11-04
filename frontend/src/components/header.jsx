import Mug_Logo from "../assets/mug.svg";
import { Link, NavLink } from "react-router-dom";

import { isAuthenticated } from "../auth-api";

export default function Header() {
	return (
		<div>
			<header id="header" className="bg-gray-200 fixed w-full h-20 md:h-16">
				<div className="flex justify-between items-center h-full">
					{/* <div className="flex items-center h-full"> */}
					<a href="/" className="h-full p-2 pl-6">
						<img src={Mug_Logo} alt="Logo" className="h-full" />
					</a>
					{/* <nav>
							<a href="/" className="mx-2">
								Home
							</a>
							<a href="#" className="mx-2">
								About
							</a>
							<a href="#" className="mx-2">
								Contact
							</a>
						</nav> */}
					{/* </div> */}
					{!isAuthenticated() ? (
						<nav className="flex">
							<a
								href="/login/"
								className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-amber-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Login
							</a>
							<a
								href="#"
								className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-cyan-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Signup
							</a>
						</nav>
					) : (
						<nav>
							{/* TODO add Navlink working */}
							<Link
								to="logout/"
								className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-amber-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Logout
							</Link>
							<NavLink
								to="posts/create/"
								className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-cyan-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Create Post
							</NavLink>
						</nav>
					)}
				</div>
			</header>
			<div id="fake-header" className="bg-transparent w-full h-20 md:h-16">
				{/* this is so content wont get clipped */}
			</div>
		</div>
	);
}
