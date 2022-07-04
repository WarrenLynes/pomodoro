import React, {useEffect, useRef, useState} from 'react';
import {Container, Typography, Box, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import PlayArrowOutlinedIcon from '@mui/icons-material/PlayArrowOutlined';
import PauseOutlinedIcon from '@mui/icons-material/PauseOutlined';

export default function App() {
  const [sessionDuration, setSessionDuration] = useState(1200); // seconds
  const [breakDuration, setBreakDuration] = useState(300); // seconds
  const [currentTimer, setCurrentTimer] = useState('session');
  const [timer, setTimer] = useState(sessionDuration);
  const timerID = useRef(null);

  const startTimer = () => {
    if(timerID.current)
      return;

    if(!timer) {
      setTimer(
        currentTimer === 'session'
          ? sessionDuration
          : breakDuration
      );
    }

    timerID.current = setInterval(() => {
      setTimer((t) => {
        if(t === 1) {
          clearInterval(timerID.current);
          timerID.current = null;
          onTimerCompleted();
          return 0;
        }
        return t - 1;
      });

    }, 1000);
  }

  const onTimerCompleted = () => {
    const nextTimer = currentTimer === 'session'
      ? 'break'
      : 'session';
    setCurrentTimer(nextTimer);
    setTimer(nextTimer === 'session'
      ? sessionDuration
      : breakDuration
    );
  }

  const stopTimer = () => {
    clearInterval(timerID.current);
    timerID.current = null;
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return (minutes > 9 ? minutes : '0' + minutes) + ':'
      + (seconds > 9 ? seconds : '0' + seconds)
  }

  const incrementDuration = (sessionToIncrement) => {
    if(sessionToIncrement === 'session') {
      setSessionDuration(sessionDuration + 60);
      if(currentTimer === 'session') {
        setTimer(timer + 60);
      }
    } else if(sessionToIncrement === 'break') {
      setBreakDuration(breakDuration + 60);
      if(currentTimer === 'break') {
        setTimer(timer + 60);
      }
    }
  }

  const decrementDuration = (sessionToIncrement) => {
    if(sessionToIncrement === 'session' && sessionDuration > 300) {
      setSessionDuration(sessionDuration - 60);
      if(currentTimer === 'session') {
        setTimer(timer - 60);
      }
    } else if(sessionToIncrement === 'break' && breakDuration > 300) {
      setBreakDuration(breakDuration - 60);
      if(currentTimer === 'break') {
        setTimer(timer - 60);
      }
    }
  }

  return(
    <Container>
      <Grid container style={{textAlign: 'center'}}>
        <Grid item sm={6}>
          <Typography variant="h3"> Break </Typography>
          <IconButton onClick={() => decrementDuration('break')}>
            <RemoveIcon fontSize='large'></RemoveIcon>
          </IconButton>
          <Typography
            variant="h4"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          >
            {formatTime(breakDuration)}
          </Typography>
          <IconButton>
            <AddIcon
              onClick={() => incrementDuration('break')}
              fontSize='large' />
          </IconButton>
        </Grid>

        <Grid item sm={6}>
          <Typography variant="h3"> Session </Typography>
          <IconButton onClick={() => decrementDuration('session')}>
            <RemoveIcon fontSize='large'></RemoveIcon>
          </IconButton>
          <Typography
            variant="h4"
            style={{
              display: 'inline-block',
              verticalAlign: 'middle'
            }}
          >
            {formatTime(sessionDuration)}
          </Typography>
          <IconButton>
            <AddIcon onClick={() => incrementDuration('session')} fontSize='large'></AddIcon>
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <IconButton onClick={startTimer}>
            <PlayArrowOutlinedIcon fontSize="large"></PlayArrowOutlinedIcon>
          </IconButton>
          <IconButton onClick={stopTimer}>
            <PauseOutlinedIcon fontSize="large"></PauseOutlinedIcon>
          </IconButton>

          <Typography variant="h1" style={{fontSize: '25rem'}}>
            {formatTime(timer)}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  )
};
// /*
// // function clearTimer() {
// //     clearInterval(id)
// // }
// // function startTimer(sessionDuration, feedbackInt) {
// //     var timer = sessionDuration, minutes, seconds;
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