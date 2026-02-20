import { useRef } from 'react';

const useInCompleteTaskScroll = (tasks) => {
    const firstIncompleteTaskRef = useRef(null)
    const firstInсompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id;
    
    return {
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    }
}

export default useInCompleteTaskScroll;