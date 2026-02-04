import TodoItem from './TodoItem';

const TodoList = (props) => {
    
    const {
        filteredTasks,
        tasks = [],
        onDeleteTaskButtonClick,
        onTaskCompleteChange,
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
                key={task.id}
                onDeleteTaskButtonClick={onDeleteTaskButtonClick}
                onTaskCompleteChange={onTaskCompleteChange}
                {...task}
            />
        ))}
        
      </ul>
    )    
}

export default TodoList;