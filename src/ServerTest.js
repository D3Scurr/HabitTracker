import React, { useEffect,useState } from "react";

function ServerTest() {
    const [data,setData] = useState(null);

    useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setData(data.message))
    }, []);

    return (
        <div>
            <p>{!data ? "Loading..." : data}</p>
        </div>
    )
}

export default ServerTest;