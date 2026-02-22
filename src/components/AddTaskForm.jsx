import Field from './Field';
import Button from './Button';
import { TaskContext } from '../context/TaskContext';
import { useContext, useState } from 'react';

const AddTaskForm = () => {
    
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TaskContext);

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();

        if (!isNewTaskTitleEmpty) {
            addTask(clearNewTaskTitle);
        }
    } 

    const onInput = (event) => {
        const {value} = event.target;
        const clearValue = value.trim();
        const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

        setNewTaskTitle(value);

        setError(hasOnlySpaces ? 'Task title cannot be empty' : '');
    }

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            
            <Field 
                className="todo__field"
                label="New task"
                id="new-task"
                ref={newTaskInputRef}
                error={error}
                value={newTaskTitle}
                onInput={onInput}
            />

            <Button 
                type="submit"
                isDisabled={isNewTaskTitleEmpty}
            > 
                Add
            </Button>
        
        </form>
    )
}

export default AddTaskForm;