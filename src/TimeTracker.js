import React, { useState, useEffect } from "react";

export default function TimeTracker() {
    const [streak, setStreak] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [breakTime, setBreakTime] = useState(0);
    const [focusTime, setFocusTime] = useState(0);
    const [nowFocus, setNowFocus] = useState(true);

    const handleFocusTimeChange = (e) => setFocusTime(e.target.value);
    const handleBreakTimeChange = (e) => setBreakTime(e.target.value);

    const updateStreak = (newStreak) => {
        fetch("http://localhost:3001/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                type: "Streak",
                value: newStreak 
            })
        })
        .then(res => res.json())
        .then(msg => {
            console.log(msg);
            setStreak(newStreak);
        })
        .catch(err => console.error("Failed to update streak:", err));
    };

    useEffect(() => {
        fetch("http://localhost:3001/api")
            .then((res) => res.json())
            .then(data => {
                if(data.Streak !== undefined){
                    setStreak(data.Streak);
                }
            })
            .catch((err) => console.error("Failed to fetch Streak:",err));
    }, []);

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
            updateStreak(streak + 1);
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
            <p>Streak: {streak}</p>
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