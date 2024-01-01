import Loading from "./loading";

export default function Button({ children, color="amber", loading=false, className="", as="button", ...props }) {
    let classes = "flex items-center justify-center gap-2 my-6 py-1 px-4 rounded-md ring-0 active:ring-2  ";
    classes += `text-white bg-${color}-600 hover:bg-${color}-700 active:ring-${color}-400`

    const Element = as;

    return (
        <Element {...props}
            className={className+" "+classes+" "}
        >
            <Loading show={loading} />
            {children}
        </Element>
    );
}