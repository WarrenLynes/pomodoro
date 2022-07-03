import React, {useRef, useState} from 'react';
import {Typography} from "@mui/material";

export default function App() {
  const [duration, setDuration] = useState(5); // seconds
  const [timer, setTimer] = useState(duration);
  const RefID = useRef(null);


  const startTimer = (time) => {
    if(time) {
      setTimer(time);
    } else if(!timer) {
      setTimer(duration);
    }

    if(RefID.current) clearInterval(RefID.current);

    RefID.current = setInterval(() => {
      setTimer((t) => {
        if(t === 1) {
          clearInterval(RefID.current);
          RefID.current = null;
          return 0;
        }
        return t - 1;
      });

    }, 1000);
  }

  const stopTimer = () => {
    clearInterval(RefID.current);
    RefID.current = null;
  }

  const incrementTimer = () => {
    startTimer(Math.floor(((timer + 60) / 60) % 60) * 60);
  }

  return(
    <div className="container" style={{textAlign: 'center'}}>
      <Typography variant="h1" component="div" gutterBottom>
        POMODORO
      </Typography>

      <hr/>
      <div className="App">
        <button onClick={() => startTimer()}> start </button>
        <button onClick={stopTimer}> stop </button>
        <button onClick={incrementTimer}> + </button>

        <h1>{Math.floor(timer / 60)} : {Math.floor(timer % 60)}</h1>

      </div>
    </div>
  )
};
// /*
// // function clearTimer() {
// //     clearInterval(id)
// // }
// // function startTimer(duration, feedbackInt) {
// //     var timer = duration, minutes, seconds;
// //     id = setInterval(function () {
// //         minutes = parseInt(timer / 60, 10);
// //         seconds = parseInt(timer % 60, 10);
// //
// //         minutes = minutes < 10 ? "0" + minutes : minutes;
// //         seconds = seconds < 10 ? "0" + seconds : seconds;
// //
// //         if(timer % feedbackInt === 0 ) {
// //             console.log(minutes + ':' + seconds);
// //         }
// //
// //         --timer;
// //
// //         if (timer < 0) {
// //             clearInterval(id)
// //         }
// //
// //     }, 1000);
// // }
// // * */