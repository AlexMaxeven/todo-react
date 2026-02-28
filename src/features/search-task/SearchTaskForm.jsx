import Field from '@/shared/components/Field';
import { TaskContext } from '@/entities/todo';
import { useContext } from 'react';

const SearchTaskForm = (props) => {

    const {styles} = props;

    const {
        searchQuery,
        setSearchQuery,
    } = useContext(TaskContext);

    return (
    <form className={styles.form}
        onSubmit={(event) => event.preventDefault()
    }
    >
        
        <Field 
            className={styles.field}
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