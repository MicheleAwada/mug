import { useState } from "react"
import { Form, useOutletContext, useActionData } from "react-router-dom"

import { changeInfo } from "../../auth-api"
import { useEffect } from "react";

export function action({ request, params }) {
    const formData = request.formData();
    const avatar = formData.get("avatar");
    if (avatar.name === "") {
		formData.delete("avatar");
	}
    const result = changeInfo(formData);
    return result
}



export default function Details() {
    const context = useOutletContext();
    const actionData = useActionData();
    const [currentUser] = context.user;

    const {simpleAddMessage} = context.messages

    useEffect(() => {
            if (actionData !== undefined) {
            if (actionData[0]) {
                simpleAddMessage(
                    "Succesfully changed your details!",
                    "success",
                )
            } else {
                simpleAddMessage(
                    "Failed to change your details!"+actionData[1],
                )
            }
        }
    }, [actionData])

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
                            </div>
                            <div>
                                <p className="text-gray-900 text-sm">Current: </p>
                                <img src={currentUser.avatar} alt="avatar" className="w-12 h-12 rounded-md" />
                            </div>
                        </div>
                        <div>
                            <p>Change Name</p>
                            <input defaultValue={currentUser.name} className="px-6 py-3 bg-gray-100" />
                        </div>
                        <div>
                            <p>Change Username</p>
                            <input defaultValue={currentUser.username} className="px-6 py-3 bg-gray-100" />
                        </div>
                        <div>
                            <p>Change Email</p>
                            <input defaultValue={currentUser.email} className="px-6 py-3 bg-gray-100" />
                        </div>
                    </fieldset>
                    <button type="sumbit" className="px-6 py-2 bg-cyan-500 text-white rounded-lg">
                        Save Changes
                    </button>
            </Form>
        </>
    )
}