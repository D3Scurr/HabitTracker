import { useState } from "react";

export default function List() {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');

    const addHabit = () => {
        if (newHabit.trim() === '') return;
        setHabits([...habits, newHabit]);
        setNewHabit('');
    };

    return (
        <div>
        <input type="text" value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder="Add new habit"/>
        <button onClick={addHabit}>Add Task</button>
        <ul>
            {habits.map((habit, index) => (
                <li key={index}>{habit}</li>
            ))}
        </ul>
    </div>
    );
}
