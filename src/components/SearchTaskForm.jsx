import Field from './Field';
import { TaskContext } from '../context/TaskContext';
import { useContext } from 'react';

const SearchTaskForm = () => {

    const {
        searchQuery,
        setSearchQuery,
    } = useContext(TaskContext);

    return (
    <form className="todo__form"
        onSubmit={(event) => event.preventDefault()
    }
    >
        
        <Field 
            className="todo__field"
            label="Search task"
            value={searchQuery}
            id="search-task"
            type="search"
            onInput={(event) => setSearchQuery(event.target.value)}
        />
        
      </form>
    )
}

export default SearchTaskForm;