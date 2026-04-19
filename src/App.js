import { KanbanProvider } from './context/KanbanContext';
import Dashboard from './pages/Dashboard';
import './styles/App.css';

function App() {
  return (
    <KanbanProvider>
      <Dashboard />
    </KanbanProvider>
  );
}

export default App;
