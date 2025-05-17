import React, { useEffect, useState } from "react";

export default function Quotes() {
    const [random,setRandom] = useState(null);
    const [quotes,setQuotes] = useState([]);

    useEffect(() => {
            fetch("http://localhost:3001/api")
                .then((res) => res.json())
                .then(data => {
                    if(data.Quotes !== undefined) {
                        setQuotes(data.Quotes);
                    }
                })
                .catch(err => console.error("Failed to fetch Quotes:",err));
        }, []);

    useEffect(() => {
        if(quotes.length > 0) {
            setRandom(Math.floor(Math.random()*quotes.length));
        }
    }, [quotes.length])

    return(
        <div>
            <p>{quotes[random]}</p>
        </div>
    )
}