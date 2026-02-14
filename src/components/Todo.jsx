import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import Button from './Button';

const Todo = () => {

    console.log('Todo rendered');

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks')

        if (savedTasks) {
            return JSON.parse(savedTasks);
        }

        return [
            {id: 'task-1', title: 'Task 1', isDone: false},
            {id: 'task-2', title: 'Task 2', isDone: true},
            {id: 'task-3', title: 'Task 3', isDone: false},
        ]
    })

    const [newTaskTitle, setNewTaskTitle] = useState('');
    
    const [searchQuery, setSearchQuery] = useState('');
    
    const newTaskInputRef = useRef(null)
    
    const firstIncompleteTaskRef = useRef(null)
    const firstInсompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

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

    const addTask = useCallback(() => {{

        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString(),
                title: newTaskTitle,
                isDone: false,
            }

            setTasks((prefTasks) => [...tasks, newTask] );

            setNewTaskTitle('');
            setSearchQuery('');
            newTaskInputRef.current.focus();
        }
    }}, [newTaskTitle])

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
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

    const doneTasks = useMemo(() => {
        return tasks.filter(({ isDone }) => isDone).length;
    }, [tasks])

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            
            <AddTaskForm 
                addTask={addTask}
                newTaskInputRef={newTaskInputRef}
                newTaskTitle={newTaskTitle}
                setNewTaskTitle={setNewTaskTitle}
            />

            <SearchTaskForm
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            <TodoInfo
                total={tasks.length}
                done={doneTasks}
                onDeleteAllButtonClick={deleteAllTasks}
            />

            <Button 
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({     behavior: 'smooth' })
                }>
                Show first incomplete task
            </Button>

            <TodoList 
                tasks={tasks}
                filteredTasks={filteredTasks}
                firstIncompleteTaskRef={firstIncompleteTaskRef}
                firstInсompleteTaskId={firstInсompleteTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskCompleted}
            />

        </div>
    )
}

export default Todo;