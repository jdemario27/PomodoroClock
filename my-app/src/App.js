import logo from './logo.svg';
import React from 'react'
import { useEffect } from 'react'
import Break from './components/Break'
import Session from './components/Session'
import TimeLeft from './components/TimeLeft'
//import React, { useState } from 'react'
import './App.css';

function App() {
  const audioElement = React.useRef(null)
  const [currentSessionType, setCurrentSessionType] = React.useState('Session');  //Session or Break
  const [intervalId, setIntervalId] = React.useState(null)
  const[sessionLength, setSessionLength] = React.useState(60 * 25); 
  const[breakLength, setBreakLength] = React.useState(300);
  const [timeLeft, setTimeLeft] = React.useState(sessionLength);
 
    //change timeLeft whenever sessionLength changes
    useEffect(() => {
        setTimeLeft(sessionLength)
    }, [sessionLength])

    const decrementSessionLengthByOneMinute = () => {
        const newSessionLength = sessionLength - 60;

        if (newSessionLength < 0) {
            setSessionLength(0);
        } else {
            setSessionLength(newSessionLength);
        }
    }

    const incrementSessionLengthByOneMinute = () => {
        setSessionLength(sessionLength + 60);
    }

    const decrementBreakLengthByOneMinute = () => {
        const newBreakLength = breakLength - 60;
        if (newBreakLength < 0) {
            setBreakLength(0);
        } else {
            setBreakLength(newBreakLength);
        }
    }

    const incrementBreakLengthByOneMinute = () => {
        setBreakLength(breakLength + 60);
    }

    const isStarted = intervalId != null
    const handleStartStopClick = () => {
        if (isStarted) {
            //if we are in started mode:
            //we want to stop the timer
            //clearInterval
            clearInterval(intervalId)
            setIntervalId(null)
        } else {
            //if we are in stopped mode:
            //decrement timeLeft by one every second (1000ms)
            //to do this we'll use setInterval
            const newIntervalId = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    const newTimeLeft = prevTimeLeft - 1;
                    if(newTimeLeft >= 0) {
                        return prevTimeLeft - 1
                    }
                    //time left is less than zero
                    audioElement.current.play()
                    //if session:
                    if(currentSessionType == 'Session') {
                        //switch to break
                        setCurrentSessionType('Break')
                        //setTimeLeft to breakSessionLength
                        setTimeLeft(breakLength)
                    }
                    //if break:
                    else if (currentSessionType == 'Break') {
                        //switch to session
                        setCurrentSessionType('Session')
                        //setTimeLeft to sessionLength
                        setTimeLeft(sessionLength)
                    }
                //return prevTimeLeft
                })
            }, 100)
            setIntervalId(newIntervalId)
        }
        
    }

    const handleResetButtonClick = () => {
      //reset audio
      audioElement.current.load()
      //clear the timeout interval
      clearInterval(intervalId)
      //set the intervalId null
      setIntervalId(null)
      //set the sessiontype to 'Session'
      setCurrentSessionType('Session')
      //reset the session length to 25 minutes
      setSessionLength(60 * 25);
      //reset the break length to 5 minutes
      setBreakLength(60 * 5)
      //reset the timer to 25 minutes (initial session length)
      setTimeLeft(60 * 25)
    }

  return (
    <div className="App">
      <Break 
        breakLength={breakLength}
        decrementBreakLengthByOneMinute = {decrementBreakLengthByOneMinute}
        incrementBreakLengthByOneMinute = {incrementBreakLengthByOneMinute}
      />
      <TimeLeft 
        //breakLength={breakLength} 
        handleStartStopClick={handleStartStopClick}
        timerLabel={currentSessionType} 
        //sessionLength={sessionLength}
        startStopButtonLabel={isStarted ? 'Stop' : 'Start'}
        timeLeft={timeLeft}
      />
      <Session 
        sessionLength={sessionLength}
        decrementSessionLengthByOneMinute = {decrementSessionLengthByOneMinute}
        incrementSessionLengthByOneMinute = {incrementSessionLengthByOneMinute}
      />
      <br></br>
      <button id="reset" onClick={handleResetButtonClick}>Reset</button>
      <audio id="beep" ref={audioElement}>
        <source src="https://onlineclock.net/audio/options/default.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}

export default App;
