import React from 'react';

export default function FoundCard({answer, index, animation = false}) {
    let answerString = '';
    answer.answers.forEach(item => {
        answerString += (item + ', ');
    })
    answerString = answerString.slice(0, answerString.length - 2);
    return (
        <div className={`found-card found-card-color${index} ${animation && 'found-card-animation'}`}>
            <div>{answer.connection}</div>
            <div>{answerString}</div>
        </div>
    )
}