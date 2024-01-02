import Mug_Logo from "../assets/mug bg.png";
import { Form, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import { Dropdown } from "flowbite-react";

import { TbListDetails } from "react-icons/tb";
import { IoLogIn, IoLogInSharp, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { HiOutlineNewspaper } from "react-icons/hi2";
import {
	HiLogin,
	HiOutlineLogin,
	HiOutlineLogout,
	HiOutlinePencil,
} from "react-icons/hi";
import { CgDetailsMore, CgLogIn, CgProfile } from "react-icons/cg";
import { Twirl as Hamburger } from "hamburger-react";

import Button from "./button"

export default function Header({ context }) {
	const [isAuthenticated] = context.auth;
	const [currentUser] = context.user;

	const [toggleHamburger, setToggleHamburger] = useState(false);
	function toggle_hamburger() {
		setToggleHamburger(!toggleHamburger);
	}
	useEffect(() => {
		const menu = document.getElementById("menu");
		if (toggleHamburger) {
			menu.style.left = "0";
		} else {
			menu.style.left = "-100%";
		}

		return () => {
			menu.style.left = "-100%";
		};
	}, [toggleHamburger]);

	const location = useLocation();

	function isSelected(link) {
		const lastLetter = link[link.length - 1];
		link = (lastLetter === "/" && link.slice(0, -1)) || link;
		if (location.pathname.startsWith(link)) {
			return true;
		}
		return false;
	}

	let menu_map = [];
	if (isAuthenticated) {
		menu_map = [
			{
				title: "Profile",
				icon: CgProfile,
				link: `/author/${currentUser.id}/`,
			},
			{
				title: "Create Post",
				icon: HiOutlineNewspaper,
				link: "/posts/create/",
			},
			{
				title: "Account Details",
				icon: TbListDetails,
				link: "/profile/details/",
			},
			{
				title: "Account Security",
				icon: MdOutlineSecurity,
				link: "/profile/security/",
			},
			{
				title: "Logout",
				icon: HiOutlineLogout,
				link: "/logout/",
			},
		];
	} else {
		menu_map = [
			{
				title: "Log in",
				icon: HiLogin,
				link: "/login/",
			},
			{
				title: "Sign Up",
				icon: IoLogInSharp,
				link: "/signup/",
			},
		];
	}

	return (
		<div className="w-full">
			<div id="fake-header" className="bg-transparent w-full h-20 md:h-16">
				{/* this is so content wont get clipped */}
			</div>

			<div className="flex flex-col absolute top-0 left-0 h-screen w-full">
				<div className="w-full">
					<header
						id="header"
						className="bg-gray-300 fixed w-full h-20 px-4 md:px-6 md:h-16 z-40"
					>
						<div className="flex justify-between items-center h-full">
							{/* <div className="flex items-center h-full"> */}
							<div className="flex items-center h-full px-4">
								<Hamburger
									size={20}
									color="black"
									direction="left"
									toggled={toggleHamburger}
									toggle={toggle_hamburger}
								/>
								<Link
									to="/"
									className="h-full p-2 gap-2 ml-6 flex items-center"
								>
									<img src={Mug_Logo} alt="Logo" className="h-full" />
									<p className="nunito text-2xl text-gray-900">Mug</p>
								</Link>
							</div>
							{!isAuthenticated ? (
								<nav className="flex">
									<Button
										to="/login/"
										as={Link}
										color="amber"
									>
										Login
									</Button>
								</nav>
							) : (
								<nav className="h-full">
									<Dropdown
										label=""
										dismissOnClick={true}
										renderTrigger={() => (
											<div className="h-full p-2">
												<img
													src={currentUser.avatar}
													alt="Profile Logo"
													className="aspect-square object-cover h-full rounded-md cursor-pointer"
												/>
											</div>
										)}
									>
										<Dropdown.Header>
											<span className="block text-sm">
												Hello,{" "}
												<span className="bold">{currentUser.username}</span>
											</span>
										</Dropdown.Header>
										<Dropdown.Item
											as={Link}
											className="flex items-center"
											to={`/author/${currentUser.id}/`}
										>
											<CgProfile className="w-4 h-4 mr-2" />
											Profile
										</Dropdown.Item>
										<Dropdown.Item
											as={Link}
											className="flex items-center"
											to={`/posts/create/`}
										>
											<HiOutlinePencil className="w-4 h-4 mr-2" />
											Create Post
										</Dropdown.Item>
										<Dropdown.Item
											as={Link}
											className="flex items-center"
											to="/profile/"
										>
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
					<div id="fake-header2" className="bg-transparent w-full h-20 md:h-16">
						{/* this is so content wont get clipped */}
					</div>
				</div>
				<div id="menu" className="bg-gray-200 z-30 fixed py-4 flex-grow">
					<ul className="w-full ">
						{menu_map.map((info, index) => {
							const isSelectedItem = isSelected(info.link);
							return (
								<li
									key={index}
									className="w-full px-4 flex flex-col items-center"
								>
									<Link
										to={info.link}
										className={
											"px-4 py-2 rounded-md flex items-center gap-4 w-full h-full " +
											(isSelectedItem
												? "border-gray-300 border-4"
												: "bg-gray-300 border-transparent border-4")
										}
									>
										{info.src && (
											<img
												src={info.src}
												className="object-cover w-10 h-10 rounded-full"
											/>
										)}
										{info.icon && (
											<info.icon
												color="#333"
												className="object-cover w-8 h-8 rounded-full"
											/>
										)}
										<p className="text-center text-gray-950 font-medium text-lg">
											{info.title}
										</p>
									</Link>
									<div className="py-4">
										{index !== menu_map.length - 1 && (
											<div className="px-14 border-b-2 border-gray-600" />
										)}
									</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
}
