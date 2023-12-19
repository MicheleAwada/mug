import { Form } from "react-router-dom"

function action() {
    //todo
}

export default function Security() {
    return (
        <div className="py-4 px-8 w-full">
            <Form className="w-full">
                <fieldset className="flex flex-col gap-6 pb-6 w-full">
                    <input className="rounded-md" type="password" name="old password" placeholder="old password" />
                    <input className="rounded-md" type="password" name="new password" placeholder="new password" />
                    <input className="rounded-md" type="password" name="confirm password" placeholder="confirm password" />
                </fieldset>

                <button type="submit" className="px-6 py-2 bg-red-400 text-white rounded-lg">Change Password</button>
            </Form>
        </div>
    )
}