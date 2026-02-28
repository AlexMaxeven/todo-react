import { createContext, useMemo } from "react";
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
        
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        appearingAnimatingId
    } = useTasks();

    const {
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    } = useInCompleteTaskScroll(tasks);

    const value = useMemo(() => ({
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskCompleted,
        
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        appearingAnimatingId,
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    }), [
        tasks,
        filteredTasks,
        deleteTask,
        deleteAllTasks,
        toggleTaskCompleted,
        
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask,
        disappearingTaskId,
        appearingTaskId,
        appearingAnimatingId,
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    ])

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}