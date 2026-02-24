import Router from './Router';
import TasksPage from './pages/TasksPage';
import TaskPage from './pages/TaskPage';

const App = () => {
    
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404</div>,
  }
  
  return (
        <Router routes={routes} />
    )
}

export default App
