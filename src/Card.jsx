// import { useState } from 'react'

export default function Card({item, found = false, selectedItems = [], setSelectedItems = () => {}}) {
    // const [highlighted, setHighlighted] = useState(false);
    if (found) {
        <div className={`card found`}>
            {item}
        </div>
    } else {
        const selected = selectedItems.includes(item);
    
        function handleClick() {
            if (!selected && selectedItems.length < 4) {
                setSelectedItems([...selectedItems, item])
            } else {
                setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item))
            }
    
            // setHighlighted(!highlighted);
        }
    
        return (
            <div id={item.split(" ").join("")} className={`card ${selected && 'selected'}`} onClick={handleClick}>
                {item}
            </div>
        )
    }
}