import { useEffect, useState } from "react"

export default function Clock() {
    const [curTime, setCurTime] = useState(new Date());
    const [isLate, setIsLate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurTime(new Date());
        },1000)
        return () => clearInterval(interval);
    })

    useEffect(() => {
        const checkTime = () => {
            const hour = new Date().getHours();
            setIsLate(hour >= 22 || hour <= 2);
        };

        checkTime();
        const interval = setInterval(checkTime,60000);

        return () => clearInterval(interval);
    })

    return(
        <div>
            <h2>{curTime.toLocaleTimeString()}</h2>
            {isLate && <p>It's getting late. Rest and recharge for the next day!</p>}
        </div>
    )
}