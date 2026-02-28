import { useContext } from 'react';

import AddTaskForm from '@/features/add-task';
import SearchTaskForm from '@/features/search-task';
import TodoInfo from '@/features/stats';
import { TodoList } from '@/entities/todo';
import Button from '@/shared/components/Button';
import { TaskContext } from '@/entities/todo';

import styles from './Todo.module.css'

const Todo = () => {
    const { firstIncompleteTaskRef, isExitingToTask } = useContext(TaskContext);

    return (
        <div className={`${styles.todo} ${isExitingToTask ? styles.isExiting : ''}`}>
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