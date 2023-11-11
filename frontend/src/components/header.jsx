import Mug_Logo from "../assets/mug bg.png";
import { Link, NavLink } from "react-router-dom";

import { Dropdown } from "flowbite-react";

import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

export default function Header({ context }) {
	const [isAuthenticated] = context.auth;
	const [currentUser] = context.user;
	console.log("YEMPEJ");
	console.log(currentUser);
	return (
		<div>
			<header
				id="header"
				className="bg-gray-200 fixed w-full h-20 md:px-6 md:h-16 z-10"
			>
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
								to="/login/"
								className="bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-amber-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Login
							</Link>
							<Link
								to="/signup/"
								className="bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800 text-cyan-100 mx-4 rounded-sm box-border px-6 py-2"
							>
								Signup
							</Link>
						</nav>
					) : (
						<nav className="h-full">
							<Dropdown
								label=""
								dismissOnClick={true}
								renderTrigger={() => (
									<img
										src={currentUser.avatar}
										alt="Profile Logo"
										className="p-2 h-full rounded-none cursor-pointer"
									/>
								)}
							>
								<Dropdown.Header>
									<span className="block text-sm">
										Hello, <span className="bold">{currentUser.username}</span>
									</span>
								</Dropdown.Header>
								<Dropdown.Item as={Link} className="flex items-center" a="#">
									<CgProfile className="w-4 h-4 mr-2" />
									Profile
								</Dropdown.Item>
								<Dropdown.Item
									as={Link}
									className="flex items-center"
									a="/posts/create/"
								>
									<HiOutlineNewspaper className="w-4 h-4 mr-2" />
									Posts
								</Dropdown.Item>
								<Dropdown.Item as={Link} className="flex items-center" a="#">
									<IoSettingsOutline className="w-4 h-4 mr-2" />
									Settings
								</Dropdown.Item>
								<Dropdown.Divider />
								<Dropdown.Item
									as={Link}
									className="flex items-center"
									to="/logout/"
								>
									<HiOutlineLogout className="w-4 h-4 mr-2" />
									Logout
								</Dropdown.Item>
							</Dropdown>
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
