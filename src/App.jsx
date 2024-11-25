import { useState, useEffect } from 'react'
import './App.css'
import Card from './Card'
import Button from './Button'
import FoundCard from './FoundCard'

function App() {
  const [answers, setAnswers] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [foundAnswers, setFoundAnswers] = useState([]);

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
    answers.forEach(answer => {
      if (selectedItems.every(item => answer.items.includes(item))) {
        // alert('yes!')
        setFoundAnswers([...foundAnswers, ...answers.filter(mapAnswer => mapAnswer.connection === answer.connection)]);
        setRemainingItems(remainingItems.filter(remainingItem => !selectedItems.includes(remainingItem)))
        deselectItems();
      }
    })
    // alert('no!')
    // return false;
  }

  return (
    <>
      <div>
        <div>Create four groups of four!</div>
        <div>{selectedItems.length} selected</div>
        <div className='board'>
          {console.log(foundAnswers)}
          {foundAnswers.map(answer => {
            console.log(answer);
            
            return <FoundCard key={answer.connection} answer={answer}/>
          })}
          {remainingItems.map(item => {
            return <Card key={item} selectedItems={selectedItems} setSelectedItems={setSelectedItems} item={item}/>
          })}
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
