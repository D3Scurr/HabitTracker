import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

const XpBar = forwardRef((props,ref) => {
    const [level,setLevel] = useState(0);
    const [xp,setXp] = useState(0);

    const fetchXp = () => {
        fetch("http://localhost:3001/api")
            .then((res) => res.json())
            .then(data =>{
                if(data.Xp !== undefined){
                    setXp(data.Xp);
                }
                if(data.Level !== undefined){
                    setLevel(data.Level)
                }
            })
            .catch((err) => console.error("Failed to fetch xp: ",err));
    }

    useImperativeHandle(ref, () => ({
        fetchXp
    }));

    useEffect(() => {
        fetchXp();
    },[])

    return(
        <div>
            <h3>Level: {level}</h3>
            <p>Experience: {xp}</p>
            <progress value={xp * 0.01} />
        </div>
    )
})

export default XpBar;