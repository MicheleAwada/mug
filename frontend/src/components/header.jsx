import Mug_Logo from "../assets/mug.svg";

export default function Header() {
    return (
        <header id="header" className="bg-gray-200 h-20 md:h-16 flex items-center">
            <a href="#" className="h-full p-2">
                <img src={Mug_Logo} alt="Logo" className="h-full" />
            </a>
            <nav>
                <a href="#" className="mx-2">Home</a>
                <a href="#" className="mx-2">About</a>
                <a href="#" className="mx-2">Contact</a>
            </nav>
        </header>
    )
}