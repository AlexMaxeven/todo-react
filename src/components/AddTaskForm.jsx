import Field from './Field';
import Button from './Button';
import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';

const AddTaskForm = () => {
    
    const {
        addTask,
        newTaskTitle,
        setNewTaskTitle,
        newTaskInputRef
    } = useContext(TaskContext);


    const onSubmit = (event) => {
        event.preventDefault();
        addTask();
    } 

    return (
        <form className="todo__form" onSubmit={onSubmit}>
            
            <Field 
                className="todo__field"
                label="New task"
                id="new-task"
                ref={newTaskInputRef}
                value={newTaskTitle}
                onInput={(event) => setNewTaskTitle(event.target.value)}
            />

            <Button type="submit"> Add</Button>
        
        </form>
    )
}

export default AddTaskForm;