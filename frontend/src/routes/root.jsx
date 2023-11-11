import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";

import { getAuthInfo, getUser } from "../auth-api";

import { Alert } from "flowbite-react";
import {
	HiInformationCircle,
	HiOutlineExclamationCircle,
	HiOutlineExclamation,
	HiOutlineCheckCircle,
} from "react-icons/hi";

export function loader() {
	return getAuthInfo();
}
function simpleMakeMessage(
	message,
	type,
	boldMessage = "",
	messages,
	setMessages
) {
	let color;
	let icon;
	if (type === "error") {
		color = "failure";
		icon = HiOutlineExclamationCircle;
		boldMessage = "Error, " + boldMessage;
	} else if (type === "success") {
		color = "success";
		icon = HiOutlineCheckCircle;
	} else if (type === "info") {
		color = "info";
		icon = HiInformationCircle;
	} else if (type === "warning") {
		color = "warning";
		icon = HiOutlineExclamation;
	}

	const index = messages.length; //doesnt exist yet

	function dismissMessage() {
		try {
			setMessages((prevList) => prevList.splice(index, 1));
		} catch (e) {
			console.log(e);
		}
	}

	const timeout = setTimeout(dismissMessage, 4500);

	function dismissNow() {
		clearTimeout(timeout);
		dismissMessage();
	}

	return (
		<Alert
			color={color}
			icon={icon}
			onDismiss={dismissNow}
			className="shadow-sm"
			key={index}
		>
			{boldMessage && <span className="font-medium">{boldMessage + " "}</span>}
			{message}
		</Alert>
	);
}

function addMessageWithSetMessage(messageElement, setMessages) {
	setMessages((prevList) => [...prevList, messageElement]);
}

export default function Root() {
	const loaderData = useLoaderData();
	const [isAuthenticated, setIsAuthenticated] = useState(
		loaderData.is_authenticated
	);
	const [currentUser, setCurrentUser] = useState(loaderData.user);

	const [messages, setMessages] = useState([]);
	const addMessage = (message) =>
		addMessageWithSetMessage(message, setMessages);
	const simpleAddMessage = (message, type, boldMessage = "") =>
		addMessage(
			simpleMakeMessage(message, type, boldMessage, messages, setMessages)
		);

	return (
		<>
			<div id="root-divider">
				<Header
					context={{
						auth: [isAuthenticated, setIsAuthenticated],
						user: [currentUser, setCurrentUser],
					}}
				/>
				<div className="relative">
					<div
						id="messages"
						className="absolute top-0 right-0 flex flex-col items-center p-8"
					>
						{messages
							.slice()
							.reverse()
							.map((message) => message)}
					</div>
					<Outlet
						context={{
							auth: [isAuthenticated, setIsAuthenticated],
							user: [currentUser, setCurrentUser],
							messages: { messages, setMessages, addMessage, simpleAddMessage },
						}}
					/>
				</div>
			</div>
		</>
	);
}
