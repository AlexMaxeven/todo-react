import Field from '@/shared/components/Field';
import Button from '@/shared/components/Button';
import { TaskContext } from '@/entities/todo';
import { useContext, useState } from 'react';

const AddTaskForm = (props) => {

    const {styles} = props;

    const [newTaskTitle, setNewTaskTitle] = useState('');
    
    const {
        addTask,
        newTaskInputRef
    } = useContext(TaskContext);

    const [error, setError] = useState('');

    const clearNewTaskTitle = newTaskTitle.trim()
    const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0;

    const onSubmit = (event) => {
        event.preventDefault();

        if (!isNewTaskTitleEmpty) {
            addTask(
                clearNewTaskTitle,
                () => setNewTaskTitle('')
            );
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
        <form className={styles.form} onSubmit={onSubmit}>
            
            <Field 
                className={styles.field}
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