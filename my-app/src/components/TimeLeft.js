import React, { useEffect } from 'react'
import { useState } from 'react'
//import { useEffect } from 'react'
import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'

momentDurationFormatSetup(moment)

const TimeLeft = ({ 
    //breakLength, 
    handleStartStopClick, 
    //sessionLength, 
    startStopButtonLabel, 
    timeLeft,
    timerLabel  
}) => {
    const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false})
    return <div id="time-left">
        <p id="timer-label">{timerLabel}</p>
        <p id="time-left">{formattedTimeLeft}</p>
        <button onClick={handleStartStopClick}>{startStopButtonLabel}</button>
        </div>
    //MM:SS
    //25:00
};

export default TimeLeft