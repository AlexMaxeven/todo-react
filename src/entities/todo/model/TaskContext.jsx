import { createContext } from "react";
import useTasks from "./useTasks";
import useInCompleteTaskScroll from "./useInCompleteTaskScroll";

export const TaskContext = createContext({});

export const TasksProvider = (props) => {
    const {children} = props;

    const {
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskCompleted,
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId
    } = useTasks();

    const {
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    } = useInCompleteTaskScroll(tasks);

    return (
        <TaskContext.Provider
            value={{
                tasks,
                filteredTasks,
                firstIncompleteTaskRef,
                firstInсompleteTaskId,
                deleteTask,
                deleteAllTasks,
                toggleTaskCompleted,
                newTaskTitle,
                setNewTaskTitle,
                searchQuery,
                setSearchQuery,
                newTaskInputRef,
                addTask,
                disappearingTaskId,
                appearingTaskId
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}