import "../styles/loading.scss"

export default function Loading({show=true}) {
    return (
        <div className={show && "lds-ellipsis"}>
            <div />
            <div />
            <div />
            <div />
        </div>
    )
}