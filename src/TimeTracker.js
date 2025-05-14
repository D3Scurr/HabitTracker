import React, { useState, useEffect } from "react";

export default function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(null);
    const [breakTime, setBreakTime] = useState(0);
    const [focusTime, setFocusTime] = useState(0);
    const [nowFocus, setNowFocus] = useState(true);

    const handleFocusTimeChange = (e) => setFocusTime(e.target.value);
    const handleBreakTimeChange = (e) => setBreakTime(e.target.value);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => (prevSeconds + 1));
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    useEffect(() => {
        if(nowFocus && seconds == focusTime) {
            setNowFocus(false);
            setSeconds(0);
        } else if (!nowFocus && seconds == breakTime) {
            setNowFocus(true);
            setSeconds(0);
        }
    }, [seconds, nowFocus, focusTime, breakTime]);

    return (
        <div>
            <h1>Time: {seconds} seconds</h1>
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