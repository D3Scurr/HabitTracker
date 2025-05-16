import React, { useEffect, useState } from "react";
import { useData } from "./DataProvider";

export default function Quotes() {
    const data = useData();
    const Quotes = data?.Quotes || [];
    const [random,setRandom] = useState(null)

    useEffect(() => {
        setRandom(Math.floor(Math.random()*Quotes.length));
    }, [Quotes.length])

    return(
        <div>
            <p>{Quotes[random]}</p>
        </div>
    )
}