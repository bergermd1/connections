import React from 'react';

export default function FoundCard({answer}) {
    let answerString = '';
    answer.answers.forEach(item => {
        answerString += (item + ', ');
    })
    answerString = answerString.slice(0, answerString.length - 2);
    return (
        <div className="found-card">
            <div>{answer.connection}</div>
            <div>{answerString}</div>
        </div>
    )
}