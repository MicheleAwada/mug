import { useState } from "react"
import { Form, useOutletContext, useActionData, Outlet } from "react-router-dom"

import { changeInfo } from "../../auth-api"
import { useEffect } from "react";

import { useLocation, Link } from "react-router-dom"

import { IoArrowBackOutline } from "react-icons/io5";

export default function Profile() {
    const location = useLocation();
    const actionData = useActionData();
    const context = useOutletContext();

    const [currentUser] = context.user;
    const {simpleAddMessage} = context.messages

    const [selectedItem, setSelectedItem] = useState('');

    useEffect(() => {
        const pathname = location.pathname;
        const base = "/profile"
        
        if (pathname.startsWith(base + '/details')) {
            setSelectedItem('details');
        } else if (pathname.startsWith(base + '/security')) {
            setSelectedItem('security');
        } else if (pathname.startsWith(base + '/delete-account')) {
            setSelectedItem('delete-account');
        } else {
            setSelectedItem('');
        }

    }, [location]);

    function isMobile() {
        const type = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const size = window.innerWidth<=768;
        return type || size
    }
    const isIndex = selectedItem===""
    return (
        <>
            <div className="flex h-full">
                {(!isMobile() || (isMobile() && isIndex)) ? <section className={"h-full bg-gray-50 " + (isMobile() ? "w-full" :"w-64")}>
                    <ul className="bg-gray-100 border-4 border-gray-200 border-t-0 border-l-0 w-full h-full">
                        <li className={"h-20 w-full border-b-2 border-gray-200 " + (selectedItem === 'details' ? "bg-gray-300 border-gray-400" : "")}>
                            <Link to="/profile/details/" className={"flex justify-center items-center h-full w-full text-gray-600 " + (selectedItem === "details" ? "text-gray-950" : "")}>Account Details</Link>
                        </li>
                        <li className={"h-20 w-full border-b-2 border-gray-200 " + (selectedItem === 'security' ? "bg-gray-300 border-gray-400" : "")}>
                            <Link to="/profile/security/" className={"flex justify-center items-center h-full w-full text-gray-600 " + (selectedItem === "security" ? "text-gray-950" : "")}>Security</Link>
                        </li>
                        <li className={"h-20 w-full border-b-2 border-gray-200 " + (selectedItem === 'delete-account' ? "bg-gray-300 border-gray-400" : "")}>
                            <Link to="/profile/delete-account/" className={"flex justify-center items-center h-full w-full text-gray-600 " + (selectedItem === "delete-account" ? "text-gray-950" : "")}>Delete Account</Link>
                        </li>
                    </ul>
                </section> : <></>}
                {!isIndex && 
                <div className="py-4 px-8 w-full">
                    <Link to="/profile/" className="w-12 h-12 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-12 lg:h-12 bg-gray-400 rounded-full flex justify-center items-center"><IoArrowBackOutline className="w-12 h-12" color="white" alt="back" /></Link>
                    <Outlet context={context} />
                </div>}
            </div>
        </>
    )
}