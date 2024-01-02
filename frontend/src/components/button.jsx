import Loading from "./loading";

export default function Button({ children, color="amber", loading=false, className="", as="button", ...props }) {

    const Element = as;

    return (
        <Element {...props}
            className={(color==="cyan" &&
            `h-8 flex items-center justify-center gap-2 py-1 px-4 rounded-md ring-0 active:ring-2 text-white bg-cyan-600 hover:bg-cyan-700 active:ring-cyan-400`
            || color==="amber" &&
            `h-8 flex items-center justify-center gap-2 py-1 px-4 rounded-md ring-0 active:ring-2 text-white bg-amber-600 hover:bg-amber-700 active:ring-amber-400`
            || color==="blue" &&
            `h-8 flex items-center justify-center gap-2 py-1 px-4 rounded-md ring-0 active:ring-2 text-white bg-blue-600 hover:bg-blue-700 active:ring-blue-400`
            || color==="gray" &&
            `h-8 flex items-center justify-center gap-2 py-1 px-4 rounded-md ring-0 active:ring-2 text-white bg-gray-600 hover:bg-gray-700 active:ring-gray-400`
            || color==="white" &&
            `h-8 flex items-center justify-center gap-2 py-1 px-4 rounded-md ring-0 active:ring-2 text-white bg-white-600 hover:bg-white-700 active:ring-white-400`
            
            )}
        >
            <Loading show={loading} />
            {!loading && children}
        </Element>
    );
}