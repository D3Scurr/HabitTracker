import { useEffect, useState } from "react"

export default function Clock() {
    const [curTime, setCurTime] = useState(new Date());
    const [isLate, setIsLate] = useState(false);

    useEffect(() => {
        // setCurTime(new Date());
        if(curTime.getHours() > 9 && curTime.getHours() < 3){
            setIsLate(true);
        } else {
            setIsLate(false);
        }
    })

    return(
        <div>
            <h2>{curTime.toLocaleTimeString()}</h2>
            {isLate && <p>It's getting late. Rest and recharge for the next day!</p>}
        </div>
    )
}