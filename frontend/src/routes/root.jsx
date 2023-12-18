import { Outlet, useLoaderData } from "react-router-dom";
import Header from "../components/header";
import React, { useEffect, useState } from "react";

import { getUser } from "../auth-api";

import { Alert } from "flowbite-react";
import {
	HiInformationCircle,
	HiOutlineExclamationCircle,
	HiOutlineExclamation,
	HiOutlineCheckCircle,
} from "react-icons/hi";

import { useGoogleOneTapLogin } from "@react-oauth/google"

export function loader() {
	return getUser();
}

function getLastKey(dict) {
	if (!dict) {
		return -1;
	}
	const keys = Object.keys(dict);
	const last_key = keys[keys.length - 1];
	return last_key;
}

function addMessageToSetMessage(dict, value) {
	const last_key = getLastKey(dict);
	const new_dict = { ...dict, [last_key + 1]: value };
	return new_dict;
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

	const key = getLastKey(messages) + 1; //doesnt exist yet

	function dismissMessage() {
		setMessages((prevList) => {
			const newList = { ...prevList };
			delete newList[key];
			return newList;
		});
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
			key={key}
		>
			{boldMessage && <span className="font-medium">{boldMessage + " "}</span>}
			{message}
		</Alert>
	);
}

function addMessageWithSetMessage(messageElement, setMessages) {
	setMessages((prevList) =>
		addMessageToSetMessage({ ...prevList }, messageElement)
	);
}

export default function Root() {
	const loaderData = useLoaderData();
	const [isAuthenticated, setIsAuthenticated] = useState(
		loaderData.is_authenticated
	);
	const [currentUser, setCurrentUser] = useState(loaderData.user);

	const [messages, setMessages] = useState({});
	const addMessage = (message) =>
		addMessageWithSetMessage(message, setMessages);
	const simpleAddMessage = (message, type, boldMessage = "") =>
		addMessage(
			simpleMakeMessage(message, type, boldMessage, messages, setMessages)
		);
	// function OneTapGoogleIfAuthed({ children }) {
	// 	if (!isAuthenticated) {
	// 		function logged_in_user(is_auth, user) {
	// 			setIsAuthenticated(is_auth);
	// 			setCurrentUser(user);
	// 			simpleAddMessage(
	// 				"You have succesfully Logged in",
	// 				"success",
	// 				"Success! "
	// 			);
	// 			navigate("/");
	// 		}
	// 		return (<GoogleOAuthProvider clientId="1046590878211-fe28tn4qmadq1qvc51n6algp1oshm7jv.apps.googleusercontent.com">
	// 					{useGoogleOneTapLogin({
	// 						onSuccess: async function(response) {
	// 							try {
	// 								const g = await googlelogin(response);
	// 								if (g.is_authenticated) {
	// 									return logged_in_user(g.is_authenticated, g.user);
	// 								}
	// 								return setError(
	// 									<p className="text-red-500 text-center my-3">{g.error}</p>
	// 								);
	// 							}
	// 							catch (e) {
	// 								console.error(e)
	// 							}
	// 						},
	// 						onError: () => console.error('Login Failed')
	// 					})}
	// 				{children}
	// 			</GoogleOAuthProvider>)

	// 	}
	// 	return children

	// }

	useGoogleOneTapLogin({
		onSuccess: async function(response) {
			try {
				const g = await googlelogin(response);
				if (g.is_authenticated) {
					return logged_in_user(g.is_authenticated, g.user);
				}
				return setError(
					<p className="text-red-500 text-center my-3">{g.error}</p>
				);
			}
			catch (e) {
				console.error(e)
			}
		},
		onError: () => console.error('Login Failed')
	})

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
						className="fixed gap-2 top-16 md:top-12 right-0 flex flex-col items-center p-8"
					>
						{Object.keys(messages)
							.reverse()
							.map((message) => messages[message])}
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
