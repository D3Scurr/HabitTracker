import React, { useEffect, useState } from "react";

export default function Quotes() {
    const [random,setRandom] = useState(null)

    const Quotes = [
        "If you don't have your own story, you become part of someone else's. — The Captain, Castlevania",
        "Give me six hours to chop down a tree and I will spend the first four sharpening the axe. — Abraham Lincoln",
        "It does not matter how slowly you go as long as you do not stop. — Confucius"
    ];

    useEffect(() => {
        setRandom(Math.floor(Math.random()*Quotes.length));
    }, [])

    return(
        <div>
            <p>{Quotes[random]}</p>
        </div>
    )
}