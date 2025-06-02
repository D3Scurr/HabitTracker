import './App.css';
import HabitList from './HabitList';
import TimeTracker from './TimeTracker';
import Quotes from './Quotes';
import Clock from './Clock';
import XpBar from './XpBar';
import Login from './Login';
import { useRef, useState } from 'react';
import SignUp from './SignUp';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [signUp, setSignUp] = useState(false);
  const XpBarRef = useRef();

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const handleTrigger = () => {
    if(XpBarRef.current) {
      XpBarRef.current.fetchXp();
    }
  }
  return (
    <div>
      {token ? (
        <>
          <h1>Welcome!</h1>
          <button onClick={handleLogout}>Logout</button>
          <HabitList onTrigger={handleTrigger}/>
          <TimeTracker onTrigger={handleTrigger}/>
          <Quotes />
          <Clock />
          <XpBar ref={XpBarRef} />
        </>
      ) : !signUp ? (
        <>
          <Login onLogin={handleLogin} />
          <button onClick={() => {setSignUp(!signUp)}}>Sign Up</button>
        </>
      ) : (
        <SignUp />
      )}
    </div>
  );
}

export default App;
