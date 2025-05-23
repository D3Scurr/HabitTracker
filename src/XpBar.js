import { useEffect, useState } from "react"

export default function XpBar(){
    const [xp,setXp] = useState(0);

    const fetchXp = () => {
        fetch("http://localhost:3001/api")
            .then((res) => res.json())
            .then(data =>{
                if(data.Xp !== undefined){
                    setXp(data.Xp);
                }
            })
            .catch((err) => console.error("Failed to fetch xp: ",err));
    }

    useEffect(() => {
        fetchXp();
    },[])

    return(
        <div>
            <p>Experience: {xp}</p>
            <progress value={xp * 0.01} />
        </div>
    )
}