import Todo from './components/Todo';
import { TasksProvider } from './context/TaskContext';

const App = () => {
    
  console.log('App rendered');
  
  return (
        <TasksProvider>

          <Todo/>

        </TasksProvider>
    )
}

export default App
