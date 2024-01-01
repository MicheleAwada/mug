import "../styles/loading.scss"

export default function Loading({show=true}) {
    return (
        <>
        {show &&
        <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
        </div>}</>
    )
}