import { memo } from 'react';
import TodoItem from './TodoItem';

const TodoList = (props) => {
    
    const {
        filteredTasks,
        tasks = [],
        onDeleteTaskButtonClick,
        onTaskCompleteChange,
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    } = props;

    const hasTasks = tasks.length > 0;

    const isEmptyFilteredTasks = filteredTasks?.length === 0;

    if(!hasTasks) {
        return (
            <div className="todo__empty-message">
                No tasks yet
            </div>
        )
    }

    if (hasTasks && isEmptyFilteredTasks) {
        return (
            <div className="todo__empty-message">
                No tasks found
            </div>
        )
    }

    return(
    <ul className="todo__list">
        {(filteredTasks ?? tasks).map((task) => (
            <TodoItem
                className="todo__item"
                key={task.id}
                ref={task.id === firstInсompleteTaskId ? firstIncompleteTaskRef : null}
     
                onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                onTaskCompleteChange={onTaskCompleteChange}
                {...task}
            />
        ))}
        
      </ul>
    )    
}

export default memo(TodoList);