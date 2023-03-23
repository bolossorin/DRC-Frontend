import { useState } from "react"

interface ICopyButton {
    content: string | null;
    label: string;
}

/**
 * Button for copying ssh connection settings.
 * @param content - Text to be copied.
 * @param label - Text inside the button.
 */
export function CopyButton({content, label}: ICopyButton) {
    const [activeLabel, setActiveLabel] = useState(label);

    const onClick = () => {
        if (content === null) return;

        navigator.clipboard.writeText(content);
        setActiveLabel("Copied!");
        setTimeout(() => {
            setActiveLabel(label);
        }, 1000);
    }

    // Makes the button gray if there is no text to copy
    const bg = content === null ? "opacity-50 cursor-default hover:bg-inherit" : ""

    return (
        <li className={`flex items-center border-b border-b-[#686868] hover:bg-[#535353] transition-all cursor-pointer select-none ${bg}`} onClick={onClick}>
            <img className="w-4 mr-3" src="/ssh.svg" alt="" />
            <p>{activeLabel}</p>
        </li>
    );
}