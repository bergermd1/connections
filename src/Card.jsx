import { useState } from 'react'

export default function Card({item, numSelected, setNumSelected}) {
    const [highlighted, setHighlighted] = useState(false);

    function handleClick() {
        if (!highlighted) {
            setNumSelected(numSelected + 1)
        } else {
            setNumSelected(numSelected - 1)
        }

        setHighlighted(!highlighted);
    }

    return (
        <div className={`card ${highlighted && 'highlighted'}`} onClick={handleClick}>
            {item}
        </div>
    )
}