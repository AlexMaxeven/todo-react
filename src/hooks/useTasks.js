import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import useTaskLocalStorage from './useTaskLocalStorage';

const useTasks = () => {
    
    const {
        savedTasks,
        saveTasks,
    } = useTaskLocalStorage();

    const [tasks, setTasks] = useState(savedTasks ?? [
        {id: 'task-1', title: 'Task 1', isDone: false},
        {id: 'task-2', title: 'Task 2', isDone: true},
        {id: 'task-3', title: 'Task 3', isDone: false},
    ])

    const [newTaskTitle, setNewTaskTitle] = useState('');
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const newTaskInputRef = useRef(null)

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure you want to delete all tasks?');

        if (isConfirmed) {
            setTasks([]);
        }
    }, [])

    const deleteTask = useCallback((taskId) => {
        console.log(`Delete task with id ${taskId}`);

        setTasks(
            tasks.filter((task) => task.id !== taskId)
        );
    }, [tasks])

    const toggleTaskCompleted = useCallback ((taskId, isDone) => {
        console.log(`Task ${taskId} ${isDone ? 'done' : 'not done'}`);
    
        setTasks(
            tasks.map((task) => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        isDone: isDone,
                    }
                }
                
                return task;
            })
        )
    }, [tasks])

    const addTask = useCallback((title) => {{

        const newTask = {
            id: crypto?.randomUUID() ?? Date.now().toString(),
            title,
            isDone: false,
        }

        setTasks((prefTasks) => [...tasks, newTask] );

        setNewTaskTitle('');
        setSearchQuery('');
        newTaskInputRef.current.focus();
    
    }}, [])

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const filteredTasks = useMemo(() => {
        
        const clearSearchQuery = searchQuery.trim().toLowerCase();
        
        return clearSearchQuery.length > 0 
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) 
        : null
    }, [searchQuery, tasks])

    return {
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
    }
}

export default useTasks;