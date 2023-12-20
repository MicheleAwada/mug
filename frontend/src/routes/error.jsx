import { Link, useRouteError } from "react-router-dom"
import { logout } from "../auth-api";
export default function ErrorPage() {
    const error = useRouteError();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col gap-2">
                <p className="text-4xl font-bold">Whops a error occured</p>
                <p className="text-gray-700">{error.statusText || error.message}</p>
                <hr className="my-4" />
                <p className="text-lg">Logging out Might Help</p>
                <button className="bg-cyan-600 rounded-md px-6 py-2 text-white" onClick={() => logout(true)}>Logout</button>
                <hr className="my-4" />
                <p className="text-lg">Go Back to Homepage?</p>
                <Link to="/" className="text-center bg-amber-600 rounded-md px-6 py-2 text-white">Home</Link>
            </div>
        </div>
    )
}