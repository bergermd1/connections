import React from 'react';
import { data, useLocation } from 'react-router-dom';
import { useEffect } from 'react';


function Stats() {
  // console.log('yeahhhhhh');

  const location = useLocation();
  const data = location.state;
  console.log(data);

  // useEffect(() => {
  //     const chartScript = document.createElement('script');
  //     chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js';
  //     chartScript.async = true;
  //     document.body.appendChild(chartScript);

  //     const dataScript = document.createElement('script');
  //     dataScript.src = './testData.js';
  //     console.log(dataScript.src);

  //     dataScript.async = true;
  //     document.body.appendChild(dataScript);


  //     return () => {
  //       document.body.removeChild(chartScript);
  //       document.body.removeChild(dataScript);
  //     };
  //   }, []);

  let maxMistakes = 0;
  for (const key in data) {
    maxMistakes = Math.max(maxMistakes, data[key]);
  }
  // console.log(maxMistakes);

  const point1 = maxMistakes*4/4;
  const point2 = maxMistakes*3/4;
  const point3 = maxMistakes*2/4;
  const point4 = maxMistakes*1/4;

  return (
    // <div>yeah</div>
    // <canvas id="myChart" style={{width:"100%",maxWidth:"700px"}}></canvas>
    <div className='graph-container'>
      <div className='left-container'>
        <div>{point1}</div>
        <div>{point2}</div>
        <div>{point3}</div>
        <div>{point4}</div>
        <div>0</div>
      </div>
      <div className='right-container'>
        <div className='chart-container'>
          <div className='bar' style={{ height: `${((400/maxMistakes) * data[0])}px` }}></div>
          <div className='bar' style={{ height: `${((400/maxMistakes) * data[1])}px` }}></div>
          <div className='bar' style={{ height: `${((400/maxMistakes) * data[2])}px` }}></div>
          <div className='bar' style={{ height: `${((400/maxMistakes) * data[3])}px` }}></div>
          <div className='bar' style={{ height: `${((400/maxMistakes) * data[4])}px` }}></div>
        </div>
        <div className='xlabel-container'>
          <div className='bar-label'>0</div>
          <div className='bar-label'>1</div>
          <div className='bar-label'>2</div>
          <div className='bar-label'>3</div>
          <div className='bar-label'>4</div>
        </div>
        <div>
          Mistakes made
        </div>
      </div>
    </div>
  )
}

export default Stats;