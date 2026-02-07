import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';
import Button from './Button';

import { useState, useEffect, useRef } from 'react';

const Todo = () => {

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
    const firstInCompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;

    const deleteAllTasks = () => {
        const isConfirmed = confirm('Are you sure you want to delete all tasks?');

        if (isConfirmed) {
            setTasks([]);
        }
    }

    const deleteTask = (taskId) => {
        console.log(`Delete task with id ${taskId}`);

        setTasks(
            tasks.filter((task) => task.id !== taskId)
        );
    }

    const toggleTaskCompleted = (taskId, isDone) => {
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
    }

    const addTask = () => {{
        // console.log('Add task');

        // const newTaskTitle = newTaskInputRef.current.value;
        
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString,
                title: newTaskTitle,
                isDone: false,
            }

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            // newTaskInputRef.current.value = '';
            setSearchQuery('');
            newTaskInputRef.current.focus();
        }

        // console.log('newTaskInputRef:', newTaskInputRef)
    }}

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        newTaskInputRef.current.focus();
    }, []);

    const clearSearchQuery = searchQuery.trim().toLowerCase();
    const filteredTasks = clearSearchQuery.length > 0 
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) 
        : null;

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
                done={tasks.filter(({ isDone }) => isDone).length}
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
                firstInCompleteTaskId={firstInCompleteTaskId}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskCompleted}
            />

        </div>
    )
}

export default Todo;