import Mug_Logo from "../assets/mug.svg";

export default function Header() {
	return (
		<>
			<header id="header" className="bg-gray-200 fixed w-full">
				<div className="flex items-center w-full h-20 md:h-16">
					<a href="#" className="h-full p-2">
						<img src={Mug_Logo} alt="Logo" className="h-full" />
					</a>
					<nav>
						<a href="#" className="mx-2">
							Home
						</a>
						<a href="#" className="mx-2">
							About
						</a>
						<a href="#" className="mx-2">
							Contact
						</a>
					</nav>
				</div>
			</header>
			<div id="fake-header" className="bg-gray-200 h-20 md:h-16">
				{/* this is so content wont get clipped */}
			</div>
		</>
	);
}
