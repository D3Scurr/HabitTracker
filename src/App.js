import './App.css';
import HabitList from './HabitList';
import TimeTracker from './TimeTracker';
import Quotes from './Quotes';
import Clock from './Clock';
import XpBar from './XpBar';
import { useRef } from 'react';

function App() {
  const XpBarRef = useRef();

  const handleTrigger = () => {
    if(XpBarRef.current) {
      console.log("Habit completed, triggering XP update");
      XpBarRef.current.fetchXp();
    }
  }
  return (
    <div>
      <HabitList onTrigger={handleTrigger}/>
      <TimeTracker />
      <Quotes />
      <Clock />
      <XpBar ref={XpBarRef} />
    </div>
  );
}

export default App;
