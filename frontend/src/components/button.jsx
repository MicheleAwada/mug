import Loading from "./loading";

export default function Button({ children, color="amber", loading=false, className="", as="button", ...props }) {

    const Element = as;

    return (
        <Element {...props}
            className={(color==="cyan" &&
            `text-white bg-cyan-600 hover:bg-cyan-700 active:ring-cyan-400`
            || color==="amber" &&
            `text-white bg-amber-600 hover:bg-amber-700 active:ring-amber-400`
            || color==="blue" &&
            `text-white bg-blue-600 hover:bg-blue-700 active:ring-blue-400`
            || color==="gray" &&
            `text-white bg-gray-600 hover:bg-gray-700 active:ring-gray-400`
            || color==="white" &&
            `text-white bg-gray-300 hover:bg-gray-400 active:ring-gray-100`
            
            ) + " " + "h-8 flex items-center justify-center gap-2 py-3 px-5 lg:py-4 lg:px-6 rounded-md ring-0 active:ring-2"
            + " " + className
        }
        >
            <Loading show={loading} />
            {!loading && children}
        </Element>
    );
}