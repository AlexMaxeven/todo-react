import Field from './Field';

const SearchTaskForm = (props) => {

    const {
        searchQuery,
        setSearchQuery,
    } = props;

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