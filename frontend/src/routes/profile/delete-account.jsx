import { Button, Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { Form, useActionData, useOutletContext } from "react-router-dom";

import { deleteAccount } from "../../auth-api"

export async function action() {
    const response = await deleteAccount()
    return response
}


export default function DeleteAccount() {
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const actionData = useActionData();
    const context = useOutletContext();
    const [isAuthenticated, setIsAuthenticated] = context.auth;
    const [currentUser, setCurrentUser] = context.user;

    const { simpleAddMessage } = context.messages;
    
    useEffect(() => {
        if (actionData !== undefined) {
            if (actionData === true) {
                simpleAddMessage("Your account has been deleted", "success", "Success!")
                setIsAuthenticated(false);
                setCurrentUser(null);
                setShowDeleteModal(false)
            } else if (actionData === false) {
                simpleAddMessage("Your account could not be deleted, perhaps try again", "error", "Error!")    
            }
        }        
    }, [actionData])

    return (
        <>
            <Modal
						show={showDeleteModal}
						size="md"
						onClose={() => setShowDeleteModal(false)}
					>
						<Modal.Header />
						<Modal.Body>
							<div className="text-center">
								<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
								<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
									Are you sure you want to delete your account?
								</h3>
								<div className="flex flex-col justify-center gap-4">
									<Button
										color="failure"
										onClick={() => setShowDeleteModal(false)}
									>
										Cancel
									</Button>
									<Form method="post" className="w-full">
										<Button type="submit" color="gray" className="w-full">
											Delete
										</Button>
									</Form>
								</div>
							</div>
						</Modal.Body>
					</Modal>
            <div className="py-4"><button onClick={() => (setShowDeleteModal(true))} className="bg-red-600 text-white px-6 py-2 rounded-md">Delete Account</button></div>
        </>
    )
}