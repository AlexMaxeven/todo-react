import { TasksProvider } from "../context/TaskContext";
import Todo from "../components/Todo";

const TasksPage = () => {
    return(
        <TasksProvider>
            <Todo/>
        </TasksProvider>
    )
}

export default TasksPage;