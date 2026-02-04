import AddTaskForm from './AddTaskForm';
import SearchTaskForm from './SearchTaskForm';
import TodoInfo from './TodoInfo';
import TodoList from './TodoList';

import { useState, useEffect } from 'react';

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
        console.log('Add task');
        
        if (newTaskTitle.trim().length > 0) {
            const newTask = {
                id: crypto?.randomUUID() ?? Date.now().toString,
                title: newTaskTitle,
                isDone: false,
            }

            setTasks([...tasks, newTask]);
            setNewTaskTitle('');
            setSearchQuery('');
        }
    }}

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const clearSearchQuery = searchQuery.trim().toLowerCase();
    const filteredTasks = clearSearchQuery.length > 0 
        ? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery)) 
        : null;

    return (
        <div className="todo">
            <h1 className="todo__title">To Do List</h1>
            
            <AddTaskForm 
                addTask={addTask}
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

            <TodoList 
                tasks={tasks}
                filteredTasks={filteredTasks}
                onDeleteTaskButtonClick={deleteTask}
                onTaskCompleteChange={toggleTaskCompleted}
            />

        </div>
    )
}

export default Todo;