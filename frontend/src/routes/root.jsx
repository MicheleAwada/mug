import { useLoaderData, Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Root() {
	const posts = useLoaderData();
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}
