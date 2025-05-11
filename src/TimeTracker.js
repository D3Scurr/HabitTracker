import React, { useState, useEffect } from "react";

export default function Timer() {
    const [isRunning, setIsRunning] = useState(false);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        let intervalId;

        if (isRunning) {
            intervalId = setInterval(() => {
            setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);

    return (
        <div>
            <h1>Time: {seconds} seconds</h1>
            <button onClick={ () => {setIsRunning(!isRunning); }}>{ isRunning ? "Stop Timer" : "Start Timer"}</button>
        </div>
    )
}