import { memo, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TodoItem from '../TodoItem/TodoItem';

const TodoList = (props) => {

    const {styles} = props

    const {
        tasks,
        filteredTasks
    } = useContext(TaskContext);

    const hasTasks = tasks.length > 0;

    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if(!hasTasks) {
        return (
            <div className={styles.emptyMessage}>
                No tasks yet
            </div>
        )
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return (
            <div className={styles.emptyMessage}>
                No tasks found
            </div>
        )
    }

    return(
    <ul className={styles.list}>
        {(filteredTasks ?? tasks).map((task) => (
            <TodoItem
                className={styles.item}
                key={task.id}
     
                {...task}
            />
        ))}
        
      </ul>
    )    
}

export default memo(TodoList);