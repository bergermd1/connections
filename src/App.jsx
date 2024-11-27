import { useState, useEffect } from 'react'
import './App.css'
import Card from './Card'
import Button from './Button'
import FoundCard from './FoundCard'
import MistakeBubble from './MistakeBubble'

function App() {
  const [answers, setAnswers] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [foundAnswers, setFoundAnswers] = useState([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);

  useEffect(() => {
    const fetchedAnswers = [
      {
        connection: 'Telling of events',
        items: [
          'Account',
          'Chronicle',
          'Description',
          'Story',
        ]
      },
      {
        connection: 'Black or Red',
        items: [
          'Balance Sheet',
          'Checkers',
          'Licorice',
          'Roulette',
        ]
      },
      {
        connection: 'Secreted by trees',
        items: [
          'Gum',
          'Latex',
          'Resin',
          'Sap',
        ]
      },
      {
        connection: 'Things on sticks',
        items: [
          'Ball-in-cup',
          'Corn dog',
          'Cotton swab',
          'Lollipop',
        ]
      },
    ]

    setAnswers(fetchedAnswers);
    setRemainingItems(randomize(answers.map(answer => answer.items).flat()));

    // const randomizedItems = randomize(answers.map(answer => answer.items).flat());
    // setItems(randomizedItems);
    // setConnections(answers.map(answer => answer.connection));
  }, [])


  function shuffle() {
    const randomizedItems = randomize(remainingItems);
    setRemainingItems(randomizedItems);
  }

  function deselectItems() {
    setSelectedItems([]);
  }

  function check() {
    let correct = false;
    answers.forEach(answer => {
      if (selectedItems.every(item => answer.items.includes(item))) {
        setFoundAnswers([...foundAnswers, ...answers.filter(mapAnswer => mapAnswer.connection === answer.connection)]);
        setRemainingItems(remainingItems.filter(remainingItem => !selectedItems.includes(remainingItem)))
        deselectItems();
        correct = true;
      }
    })
    if (!correct) {
      const lastBubble = document.querySelector(`.mistake-bubbles-container div:nth-child(${mistakesRemaining}) > div`);
      const wrongElements = selectedItems.map(item => {
        const e = {
          element: document.querySelector(`#${item.split(" ").join("")}`),
          index: remainingItems.indexOf(item),
        }
        return e;
      });
      wrongElements.sort((a,b) => a.index - b.index)
      
      wrongElements.forEach((wrongElement, i) => {
        setTimeout(() => {
          wrongElement.element.className = 'card selected card-mistake-animation1'
        }, 100 * i);
        setTimeout(() => {
          wrongElement.element.className = 'card selected'
          wrongElement.element.className = 'card selected card-mistake-animation2'
          setTimeout(() => {
            wrongElement.element.className = 'card selected'
          }, 1000);
        }, 800);
        /////disable board/buttons
      })
      
      lastBubble.className = 'mistake-bubble mistake-bubble-disappear'
      setMistakesRemaining(mistakesRemaining - 1);
    }
  }

  function getMistakeBubbles() {
    let bubbles = [];
    for (let i = 0; i < 4; i++) {
      bubbles.push(<MistakeBubble></MistakeBubble>)
    }
    return (
      bubbles
    )
  }

  return (
    <>
      <div>
        <div>Create four groups of four!</div>
        {/* <div>{selectedItems.length} selected</div> */}
        <div className='board'>
          {foundAnswers.map(answer => {
            return <FoundCard key={answer.connection} answer={answer}/>
          })}
          {remainingItems.map(item => {
            return <Card key={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} item={item}/>
          })}
        </div>
        <div className='mistakes-container'>
          <div>Mistakes Remaining:</div>
          <div className='mistake-bubbles-container'>{getMistakeBubbles()}</div>
        </div>
        <Button text={'Shuffle'} handleClick={shuffle}/>
        <Button text={'Deselect All'} handleClick={deselectItems} disabled={selectedItems.length === 0}/>
        <Button text={'Submit'} handleClick={check} disabled={selectedItems.length !== 4}/>
      </div>
    </>
  )
}



function randomize(items) {
    const randomizedIndices = [];
    const indices = items.map((item, i) => i);
    
    while (indices.length > 0) {
      const index = Math.floor(Math.random() * indices.length);
      randomizedIndices.push(indices[index]);
      indices.splice(index, 1);
    }

    return randomizedIndices.map(index => items[index])
}

export default App
