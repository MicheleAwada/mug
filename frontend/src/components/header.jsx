import Mug_Logo from "../assets/mug bg.png";
import { Link, NavLink } from "react-router-dom";

export default function Header({ auth }) {
	const [isAuthenticated, setIsAuthenticated] = auth;
	return (
		<div>
			<header id="header" className="bg-gray-200 fixed w-full h-20 md:h-16">
				<div className="flex justify-between items-center h-full">
					{/* <div className="flex items-center h-full"> */}
					<div className="flex items-center h-full">
						<NavLink href="/" className="h-full p-2 pl-6">
							<img src={Mug_Logo} alt="Logo" className="h-full" />
						</NavLink>
						<p className="nunito text-2xl">Mug</p>
					</div>
					{!isAuthenticated ? (
						<nav className="flex">
							<Link
								href="/login/"
								className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-amber-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Login
							</Link>
							<Link
								href="#"
								className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-cyan-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Signup
							</Link>
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
							<Link
								to="posts/create/"
								className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-cyan-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Create Post
							</Link>
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
