import { useState, useEffect } from "react";

export default function HabitList() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [checkboxes, setCheckboxes] = useState([]);

    const fetchHabits = () => {
        fetch("http://localhost:3001/api")
            .then(res => res.json())
            .then(data => {
                setHabits(data.Habits || []);
            })
            .catch(err => console.error("Failed to fetch habits:", err));
    };

    const fetchCheckboxes = () => {
        fetch("http://localhost:3001/api")
            .then(res => res.json())
            .then(data => {
                setCheckboxes(data.Checkboxes || []);
            })
            .catch(err => console.error("Failed to fetch checkboxes:",err));
    }

    useEffect(() => {
        fetchHabits();
    }, []);

    useEffect(() => {
        if (habits.length > 0) {
            setCheckboxes(habits.map(h => false));
        }
        fetchCheckboxes();
    }, [habits]);

    const addHabit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                updates: [
                    {type: "Habit",value: newHabit},
                    {type: "Checkbox",value: false}
                ]
            })
        })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            setNewHabit("");
            fetchHabits();
            fetchCheckboxes();
        })
        .catch(err => console.error("Failed to add habit:", err));
    };

    const checkedHabit = (index) => {
        alert(`checked off a habit ${habits[index].name}`);
        setCheckboxes(prev => {
            const updated = [...prev];
            if(updated[index] == false) updated[index] = true;
            return updated;
        })

        const updatedCheckboxes = [...checkboxes];
        if(updatedCheckboxes[index] === false) updatedCheckboxes[index] = true;

        setCheckboxes(updatedCheckboxes);

        fetch("http://localhost:3001/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                updates: [
                    { type: "CheckboxUpdate", value: updatedCheckboxes },
                    { type: "Xp",value: 10 }
                ]
            })
        }).then(fetchCheckboxes);
    }

    return (
        <div>
            <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Add new habit"
            />
            <button onClick={addHabit}>Add Task</button>

            <ul>
                {habits.map((habit, index) => (
                    <li key={index}>{habit.name}<input type="checkbox" checked={checkboxes[index] || false} onChange={() => checkedHabit(index)}/></li>
                ))}
            </ul>
        </div>
    );
}