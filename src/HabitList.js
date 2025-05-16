import { useState, useEffect } from "react";

export default function HabitList() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');

    const fetchHabits = () => {
        fetch("http://localhost:3001/api")
            .then(res => res.json())
            .then(data => {
                setHabits(data.Habits || []);
            })
            .catch(err => console.error("Failed to fetch habits:", err));
    };

    useEffect(() => {
        fetchHabits();
    }, []);

    const addHabit = (e) => {
        e.preventDefault();

        fetch("http://localhost:3001/index", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newHabit }),
        })
        .then(res => res.text())
        .then(msg => {
            alert(msg);
            setNewHabit("");
            fetchHabits();
        })
        .catch(err => console.error("Failed to add habit:", err));
    };

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
                    <li key={index}>{habit.name}</li>
                ))}
            </ul>
        </div>
    );
}
