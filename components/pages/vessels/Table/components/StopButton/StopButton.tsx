interface IStopButton {
    disabled: boolean
    onClick: () => void
}

/**
 * Button to stop the session.
 */
export function StopButton({onClick, disabled}: IStopButton) {
    const bg = disabled ? "opacity-50 cursor-default hover:bg-inherit" : ""
    return (
        <li
            className={`flex items-center border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none ${bg}`}
            onClick={() => {if (disabled) onClick()}}
        >
            <img className="w-4 mr-3" src="/stop.svg" alt="" />
            <p>Stop</p>
        </li>
    )
}