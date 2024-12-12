import React from 'react';
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css'
import Card from './Card.jsx'
import Button from './Button.jsx'
import FoundCard from './FoundCard.jsx'
import MistakeBubble from './MistakeBubble.jsx'
// import router from '../server/router.cjs';

function Game() {
  const [answers, setAnswers] = useState([]);
  const [remainingItems, setRemainingItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [foundAnswers, setFoundAnswers] = useState([]);
  const [mistakesRemaining, setMistakesRemaining] = useState(4);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [puzzleId, setPuzzleId] = useState(0);
  const [gameNumber, setGameNumber] = useState(0);
  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();
  
  useEffect(() => {
    if (data !== null) {
        setIsLoggedIn(true);
        setUserId(data.userId)
        setUsername(data.username);
    }
    async function fetchData(user = '') {
      const keyPromise = await fetch(`http://localhost:3000/data/${user}`);
      const key = await keyPromise.json()
      setFoundAnswers([]);
      setMistakesRemaining(4);
      setPuzzleId(key[0].puzzleId);
      setAnswers(key);
      setRemainingItems(randomize(key.map(item => item.answers).flat()));
    }

    if (data !== null) {
      fetchData(data.userId)
    } else {
      fetchData();
    }
    deselectItems();
    // validate();
  }, [gameNumber])

  function swapElements(element1, element2) {
    const card1 = element1.getBoundingClientRect();
    const card2 = element2.getBoundingClientRect();
  
    const dX = card2.left - card1.left;
    const dY = card2.top - card1.top;
  
    element1.style.transform = `translate(${dX}px, ${dY}px)`;
    element2.style.transform = `translate(${-dX}px, ${-dY}px)`;
  
    // Trigger a reflow (for animation)
    element1.offsetHeight; // force reflow
    element2.offsetHeight; // force reflow
  
    // element2.innerText = element1.innerText
    
    // After the transition, switch the grid positions (visually swap)
    setTimeout(() => {
      element2.innerText = element1.innerText
      element1.style.transition = 'none';
      element2.style.transition = 'none';

      setTimeout(() => {
        element1.style.transition = 'transform 750ms ease';
        element2.style.transition = 'transform 750ms ease';
      }, 50); // Small delay to re-enable transition
    }, 2000); // Match the duration of the transition
  }

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
      if (selectedItems.every(item => answer.answers.includes(item))) {

        const correctElements = selectedItems.map(item => {
          const e = {
            element: document.querySelector(`#${item.split(" ").join("")}`),
            index: remainingItems.indexOf(item),
          }
          return e;
        });
        correctElements.sort((a,b) => a.index - b.index)
        
        correctElements.forEach((wrongElement, i) => {
          setTimeout(() => {
            wrongElement.element.className = 'card selected card-submit-animation'
          }, 100 * i);
        });

        const cardsInPlace = selectedItems.filter(item => {
          const e = document.querySelector(`#${item.split(" ").join("")}`);
          const row = window.getComputedStyle(e).getPropertyValue('grid-row');
          return (parseInt(row) === 1 + foundAnswers.length)
        })
        const cardsToSwitch = selectedItems.filter(item => {
          const e = document.querySelector(`#${item.split(" ").join("")}`);
          const row = window.getComputedStyle(e).getPropertyValue('grid-row');
          return (parseInt(row) !== 1 + foundAnswers.length)
        })

        const switchedCards = [];

        setTimeout(() => {
          for (let i = 0; i < 4; i++) {
            if (!cardsInPlace.includes(remainingItems[i])) {
              swapElements(document.querySelector(`#${remainingItems[i].split(" ").join("")}`), document.querySelector(`#${cardsToSwitch[0].split(" ").join("")}`));
              switchedCards.push([document.querySelector(`#${remainingItems[i].split(" ").join("")}`), [
                window.getComputedStyle(document.querySelector(`#${cardsToSwitch[0].split(" ").join("")}`)).getPropertyValue('grid-row'),
                window.getComputedStyle(document.querySelector(`#${cardsToSwitch[0].split(" ").join("")}`)).getPropertyValue('grid-column')
              ]])
              cardsToSwitch.shift();
            }
          }
        }, 1000);


        setTimeout(() => {
          switchedCards.forEach(card => {
            // card[0].innerText = 'XXXXXX'
            console.log(card[0].innerText);
            
            console.log(card);
            card[0].style.gridArea = `${card[1][0]} / ${card[1][1]}`
          })

          remainingItems.forEach(item => {
            document.querySelector(`#${item.split(" ").join("")}`).style.transition = 'none';
            document.querySelector(`#${item.split(" ").join("")}`).className = 'card false';
            document.querySelector(`#${item.split(" ").join("")}`).style.transform = 'translate(0, 0)';
            setTimeout(() => {
              document.querySelector(`#${item.split(" ").join("")}`).style.transition = 'transform 750ms ease'
            }, 0)
          })
          remainingItems.sort((a,b) => {
            const aRow = window.getComputedStyle(document.querySelector(`#${a.split(" ").join("")}`)).getPropertyValue('grid-row');
            const aCol = window.getComputedStyle(document.querySelector(`#${a.split(" ").join("")}`)).getPropertyValue('grid-column');
            const bRow = window.getComputedStyle(document.querySelector(`#${b.split(" ").join("")}`)).getPropertyValue('grid-row');
            const bCol = window.getComputedStyle(document.querySelector(`#${b.split(" ").join("")}`)).getPropertyValue('grid-column');
            return ((10*aRow) + aCol - ((10*bRow) + bCol));
          })
          deselectItems();
          setFoundAnswers([...foundAnswers, ...answers.filter(mapAnswer => mapAnswer.connection === answer.connection)]);
          setRemainingItems(remainingItems.filter(remainingItem => !selectedItems.includes(remainingItem)))
        }, 2000);

        if (foundAnswers.length === 3) {
          setTimeout(async () => {
            await endGame(4 - mistakesRemaining);
          }, 3000);
        }

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
          wrongElement.element.className = 'card selected card-submit-animation'
        }, 100 * i);
        setTimeout(() => {
          wrongElement.element.className = 'card selected'
          wrongElement.element.className = 'card selected card-mistake-animation'
          setTimeout(() => {
            wrongElement.element.className = 'card selected'
          }, 1000);
        }, 800);
        /////disable board/buttons
      })

      lastBubble.className = 'mistake-bubble mistake-bubble-disappear'
      setMistakesRemaining(mistakesRemaining - 1);
    
      if (mistakesRemaining === 1) {
        setTimeout(async () => {
          await endGame(4);
        }, 3000);
      }
    }
  }

  async function getStats() {
    const dataResult = await fetch(`http://localhost:3000/stats/${userId}`);
    const data = await dataResult.json()
    navigate('/stats', {state: data});
  }

  async function endGame(mistakesMade) {
    // const puzzleId = puzzleId
    if (userId !== "") {
      const login = await fetch(`http://localhost:3000/complete`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({mistakesMade, puzzleId, userId})
      })
    }
    // alert("Well Done")

  }

  function newGame() {
    setGameNumber(gameNumber + 1);
  }

  function getMistakeBubbles() {    
    let bubbles = [];
    for (let i = 0; i < 4; i++) {
      bubbles.push(<MistakeBubble key={i+(4*gameNumber)}></MistakeBubble>)
    }
    return (
      bubbles
    )
  }

  function select4(n) {
    const c1 = document.querySelector(`#${answers[foundAnswers.length].answers[0].split(" ").join("")}`);
    const c2 = document.querySelector(`#${answers[foundAnswers.length].answers[1].split(" ").join("")}`);
    const c3 = document.querySelector(`#${answers[foundAnswers.length].answers[2].split(" ").join("")}`);
    const c4 = document.querySelector(`#${answers[foundAnswers.length].answers[3].split(" ").join("")}`);
    setTimeout(() => {
      c1.click();
    }, 50);
    setTimeout(() => {
      c2.click();
    }, 100);
    setTimeout(() => {
      c3.click();
    }, 150);
    setTimeout(() => {
      c4.click();
    }, 200);
  }

  async function logout() {
    await fetch(`http://localhost:3000/logout`);
    setIsLoggedIn(false);
  }

  return (
    <div className='container'>
      <div className='welcome-container'>
        {isLoggedIn && `Welcome ${username}!`}
        {isLoggedIn && 
            <Button text={"View my stats"} handleClick={getStats} />
          }
      </div>
      <div>
          <div>Create four groups of four!</div>
          <div className='board'>
          {foundAnswers.map((answer, i) => {
              if (i !== foundAnswers.length - 1) {
              return <FoundCard key={answer.connection} answer={answer} index={i} />
              } else {
              return <FoundCard key={answer.connection} answer={answer} index={i} animation={true} />
              }
          })}
          {remainingItems.map((item, i) => {
              return <Card key={item} foundAnswers={foundAnswers.length} index={i} selectedItems={selectedItems} setSelectedItems={setSelectedItems} item={item}/>
          })}
          </div>
          <div className='mistakes-container'>
          <div>Mistakes Remaining:</div>
          <div className='mistake-bubbles-container'>{getMistakeBubbles()}</div>
          </div>
          <Button text={'Shuffle'} handleClick={shuffle}/>
          <Button text={'Deselect All'} handleClick={deselectItems} disabled={selectedItems.length === 0}/>
          <Button text={'Submit'} handleClick={check} disabled={selectedItems.length !== 4 || mistakesRemaining === 0}/>
          <Button text={'New Game'} handleClick={newGame} disabled={foundAnswers.length !== 4 && mistakesRemaining !== 0}/>
          <br />
          <br />
          (For demonstration purposes)
          <br />
          <Button text={'Select 4 correct answers'} disabled={selectedItems.length !== 0} handleClick={() => select4(0)}/>
          {/* <Button text={'Select 4 more'} handleClick={() => select4(1)}/> */}
          {/* <br /> */}
          {/* <Button text={'Select another 4'} handleClick={() => select4(2)}/> */}
          {/* <Button text={'Select last 4'} handleClick={() => select4(3)}/> */}
      </div>
    </div>
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

export default Game
