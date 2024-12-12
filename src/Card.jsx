import React from 'react';
// import { useState } from 'react'

export default function Card({item, foundAnswers, index, selectedItems, setSelectedItems}) {
    const selected = selectedItems.includes(item);

    function handleClick() {
        if (!selected && selectedItems.length < 4) {
            setSelectedItems([...selectedItems, item])
        } else {
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== item))
        }
    }

    // const tempItem = item.split(' ');
    // console.log(tempItem);
    // const maxItem = tempItem.reduce((a, b) => {
    //     if (a.length > b.length) {
    //         return a;
    //     } else {
    //         return b;
    //     }
    // })
    // console.log(maxItem);
    

    // console.log(item.length);
    let cardFontSize;
    if (item.length < 9) {
        cardFontSize = '1.1rem';
        // console.log('nope');
    } else if (item.length < 13) {
        // console.log('yeah');
        cardFontSize = '.8rem';
    } else {
        cardFontSize = '.7rem';
    }
    

    const row = Math.floor(index/4) + foundAnswers + 1;
    const column = (index % 4) + 1;

    return (
        <div id={item.split(" ").join("")} className={`card ${selected && 'selected'}`} onClick={handleClick} style={{gridRow: row, gridColumn: column, transform: 'translate(0px, 0px)', transition: 'transform 750ms', fontSize: cardFontSize}}>
            {item}
        </div>
    )
}