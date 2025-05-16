import React, { useState, useEffect } from "react";
import { useData } from "./DataProvider";

export default function TimeTracker() {
    const data = useData();
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [focusTime, setFocusTime] = useState(0);
    const [nowFocus, setNowFocus] = useState(true);

    const handleFocusTimeChange = (e) => setFocusTime(e.target.value);
    const handleBreakTimeChange = (e) => setBreakTime(e.target.value);

    useEffect(() => { // Handling second to minute change
        if(seconds >= 60){
            setMinutes((prevMinutes) => (prevMinutes + 1));
            setSeconds(0);
        }
    },[minutes,seconds])

    useEffect(() => { // Handling the timer
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setElapsedTime((prevElapsedTime) => (prevElapsedTime + 1));
                setSeconds((prevSeconds) => (prevSeconds + 1));
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    useEffect(() => { // Handling Focus/Break time checks
        if(nowFocus && elapsedTime == focusTime) {
            setNowFocus(false);
            setElapsedTime(0);
            setSeconds(0);
            setMinutes(0);
        } else if (!nowFocus && elapsedTime == breakTime) {
            setNowFocus(true);
            setElapsedTime(0);
            setSeconds(0);
            setMinutes(0);
        }
    }, [elapsedTime, nowFocus, focusTime, breakTime]);

    return (
        <div>
            <h1>Time: {minutes < 10 ? "0"+minutes : minutes}:{seconds < 10 ? "0"+seconds : seconds} </h1>
            <p>{ nowFocus ? "Focus!" : "Break time :D" }</p>
            <input 
                type="number"
                value={focusTime}
                onChange={handleFocusTimeChange}
            />
            <input 
                type="number"
                value={breakTime}
                onChange={handleBreakTimeChange}
            />
            <button onClick={ () => {setIsRunning(!isRunning); }}>{ isRunning ? "Stop Timer" : "Start Timer"}</button>
        </div>
    )
}