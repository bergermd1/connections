// import { useState } from 'react'

export default function Card({item, index, found = false, selectedItems = [], setSelectedItems = () => {}}) {
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
    
        const row = Math.floor(index/4) + 1;
        const column = (index % 4) + 1;

        return (
            <div id={item.split(" ").join("")} className={`card ${selected && 'selected'}`} onClick={handleClick} style={{gridRow: row, gridColumn: column, transform: 'translate(0px, 0px)', transition: 'transform 2s'}}>
                {item}
            </div>
        )
    }
}