import { useContext } from 'react';

import AddTaskForm from '../AddTaskForm/AddTaskForm';
import SearchTaskForm from '../SearchTaskForm/SearchTaskForm';
import TodoInfo from '../TodoInfo/TodoInfo';
import TodoList from '../TodoList/TodoList';
import Button from '../Button/Button';
import { TaskContext } from '../../context/TaskContext';

import styles from './Todo.module.css'

const Todo = () => {

    const {firstIncompleteTaskRef} = useContext(TaskContext);

    return (
        
        <div className={styles.todo}>
            <h1 className={styles.title}>To Do List</h1>
            
            <AddTaskForm styles={styles}
            />

            <SearchTaskForm styles={styles}
            />

            <TodoInfo styles={styles}
            />

            <Button 
                onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({     behavior: 'smooth' })
                }>
                Show first incomplete task
            </Button>

            <TodoList styles={styles}
                
            />

        </div>
       
    )
}

export default Todo;