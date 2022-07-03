import React from 'react';
import {useState, useRef} from 'react';

export default function Timer({duration}) {
  const [timer, setTimer] = useState(duration);
  const id = useRef(null);

  React.useEffect(() => {
    console.log('effect', timer);
    if(timer) {
      id.current = setInterval(() => {
        console.log(timer);

        setTimer(timer - 1);
      }, 1000)
    }

    return () => stopTimer();
  }, [timer]);

  const startTimer = () => {
    setTimer(duration);
  }

  const stopTimer = () => {
    clearInterval(id.current);
  }

  return (
    <div className="App">
      <button onClick={() => startTimer()}> start </button>
      <button onClick={() => stopTimer()}> stop </button>
      <h1>{parseInt(timer / 60, 10)} : {parseInt(timer % 60, 10)}</h1>
    </div>
  );
}