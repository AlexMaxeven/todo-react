import { useRef } from 'react';

const useInCompleteTaskScroll = (tasks) => {
    const firstIncompleteTaskRef = useRef(null);
    const firstInсompleteTaskId = (Array.isArray(tasks) ? tasks : [])
        .find((task) => task && !task.isDone)?.id;
    
    return {
        firstIncompleteTaskRef,
        firstInсompleteTaskId,
    }
}

export default useInCompleteTaskScroll;