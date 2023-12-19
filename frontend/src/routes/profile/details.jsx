import { useState } from "react"
import { Form, useOutletContext, useActionData } from "react-router-dom"

import { changeInfo } from "../../auth-api"
import { useEffect } from "react";

import { ErrorTextObj } from "../signup";

import { attempValuesOfObject } from "../../utils";

export async function action({ request, params }) {
    const formData = await request.formData();
    const avatar = formData.get("avatar");
    if (avatar.name === undefined) {
		formData.delete("avatar");
	}
    const result = changeInfo(formData);
    return result
}



export default function Details() {
    const context = useOutletContext();
    const actionData = useActionData();
    const [currentUser, setCurrentUser] = context.user;

    const {simpleAddMessage} = context.messages

    useEffect(() => {
            if (actionData !== undefined) {
                if (actionData[0]) {
                    simpleAddMessage(
                        "Succesfully changed your details!",
                        "success",
                    )
                    setCurrentUser(actionData[1])
                } else {
                    let error_message = attempValuesOfObject(actionData[1], "non_field_errors.0", "")
                    if (error_message === undefined || typeof error_message !== "string") { error_message="Check the errors below" }
                    simpleAddMessage(
                        "Failed to change your details! "+ error_message,
                        "error",
                    )
                }
            }
    }, [actionData])
	const ErrorText = ({ child }) => <ErrorTextObj main_obj={actionData && actionData[1] || {} } child={child} />



    return (
        <>
            <Form className="pb-10" method="POST">
                    <fieldset className="flex flex-col gap-2 pb-4">
                        <div className="flex gap-8 pb-2">
                            <div>
                                <label
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    htmlFor="profile_avatar_input"
                                >
                                    Change Avatar
                                </label>
                                <input
                                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    id="profile_avatar_input"
                                    type="file"
                                    name="avatar"
                                    required={false}
                                />
                                <ErrorText child="avatar" />
                            </div>
                            <div>
                                <p className="text-gray-900 text-sm">Current: </p>
                                <img src={currentUser.avatar} alt="avatar" className="w-12 h-12 rounded-md" />
                            </div>
                        </div>
                        <div>
                            <p>Change Name</p>
                            <input name="name" defaultValue={currentUser.name} className="px-6 py-3 bg-gray-100" />
                            <ErrorText child="name" />
                        </div>
                        <div>
                            <p>Change Username</p>
                            <input name="username" defaultValue={currentUser.username} className="px-6 py-3 bg-gray-100" />
                            <ErrorText child="username" />
                        </div>
                        <div>
                            <p>Change Email</p>
                            <input name="email" defaultValue={currentUser.email} className="px-6 py-3 bg-gray-100" />
                            <ErrorText child="email" />
                        </div>
                    </fieldset>
                    <ErrorText child="non_field_errors" />
                    <ErrorText child="" />
                    <button type="sumbit" className="px-6 py-2 bg-cyan-500 text-white rounded-lg">
                        Save Changes
                    </button>
            </Form>
        </>
    )
}