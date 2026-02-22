import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import tasksAPI from '../api/tasksAPI';

const useTasks = () => {
    
    // const {
    //     savedTasks,
    //     saveTasks,
    // } = useTaskLocalStorage();

    const [tasks, setTasks] = useState([])

    const [newTaskTitle, setNewTaskTitle] = useState('');
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const newTaskInputRef = useRef(null)

    const deleteAllTasks = useCallback(() => {
        const isConfirmed = confirm('Are you sure you want to delete all tasks?');

        if (isConfirmed) {
            setTasks([]);

            tasksAPI.deleteAll(tasks).then(() => setTasks([]))
        }
    }, [tasks])

    const deleteTask = useCallback((taskId) => {
        console.log(`Delete task with id ${taskId}`);

        tasksAPI.delete(taskId)
        .then(() => {
            setTasks(
                tasks.filter((task) => task.id !== taskId)
            );
        })
    }, [tasks])

    const toggleTaskCompleted = useCallback ((taskId, isDone) => {
        console.log(`Task ${taskId} ${isDone ? 'done' : 'not done'}`);

       tasksAPI.toggleComplete(taskId, isDone)
        .then(() => {
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
        })

    }, [tasks])

    const addTask = useCallback((title) => {{

        const newTask = {
            title,
            isDone: false,
        }

        tasksAPI.add(newTask)
        .then(addedTask => {
            
            setTasks((prevTasks) => [...prevTasks, addedTask] );
    
            setNewTaskTitle('');
            setSearchQuery('');
            newTaskInputRef.current.focus();
        })

    
    }}, [])

    useEffect(() => {
        newTaskInputRef.current.focus();

        tasksAPI.getAll().then(setTasks)
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