import './App.css';
import HabitList from './HabitList';
import TimeTracker from './TimeTracker';
import Quotes from './Quotes';
import { DataProvider } from './DataProvider';

function App() {
  return (
    <DataProvider>
      <HabitList />
      <TimeTracker />
      <Quotes />
    </DataProvider>
  );
}

export default App;
