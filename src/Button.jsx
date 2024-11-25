export default function Button({text, handleClick, disabled}) {
    return (
        <button className="button" onClick={handleClick} disabled={disabled}>{text}</button>
    )
}