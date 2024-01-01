import Loading from "./loading";

export default function Button({ children, color, loading, className, ...props }) {
    let classes = "flex items-center justify-center gap-2 my-6 py-1 px-4 rounded-md ring-0 ring-offset-2 active:ring-2 ";
    classes += `text-white bg-${color}-600 hover:bg-${color}-700 active:ring-${color}-400`
    return (
        <button {...props}
            className={className+" "+classes+""}
        >
            <Loading show={loading} />
            {children}
        </button>
    );
}