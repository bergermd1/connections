import { useState, useEffect } from 'react'
import './App.css'
import Card from './Card'

function App() {
  const [numSelected, setNumSelected] = useState(0)
  const [items, setItems] = useState([]);

  // let randomizedItems;

  useEffect(() => {
    const answers = [
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
    const randomizedItems = randomize(answers.map(answer => answer.items).flat());
    setItems(randomizedItems);
  }, [])

  // console.log(randomizedItems);
  
  return (
    <>
      <div>
        <div>Create four groups of four!</div>
        <div>{numSelected} selected</div>
        <div className='board'>
          {items.map(item => {
              return <Card key={item} numSelected={numSelected} setNumSelected={setNumSelected} item={item}/>
          })}
        </div>
      </div>
    </>
  )
}

function randomize(items) {
    const randomizedIndices = [];
    const indices = items.map((item, i) => i);
    // console.log(indices);
    
    while (indices.length > 0) {
      const index = Math.floor(Math.random() * indices.length);
      randomizedIndices.push(indices[index]);
      indices.splice(index, 1);
      // console.log(indices);
      
    }

    return randomizedIndices.map(index => items[index])
}

export default App
