import { useActionData, useOutletContext, Form } from "react-router-dom"
import { changePassword } from "../../auth-api";
import { useEffect } from "react";

export async function action({ request, params }) {
    const formData = await request.formData();
    const response = changePassword(formData);
    return response
}

export default function Security() {
    const actionData = useActionData();
    const context = useOutletContext();
    const {simpleAddMessage} = context.messages;
    useEffect(() => {
        if (actionData===undefined) {}
        else if (actionData===true) {simpleAddMessage("Success, your password has been changed", "success")}
        else if (actionData===false) {simpleAddMessage("Failed to change password", "error")}
    }, [actionData])
    return (
        <div className="py-4 px-8 w-full">
            <Form className="w-full" method="POST">
                <legend className="text-2xl pb-8">
                    Change Password
                </legend>
                <fieldset className="flex flex-col gap-6 pb-6 w-80">
                    <input className="rounded-md" type="password" name="old_password" placeholder="old password" />
                    <input className="rounded-md" type="password" name="new_password1" placeholder="new password" />
                    <input className="rounded-md" type="password" name="new_password2" placeholder="confirm password" />
                </fieldset>

                <button type="submit" className="px-6 py-2 bg-red-400 text-white rounded-lg">Change Password</button>
            </Form>
        </div>
    )
}