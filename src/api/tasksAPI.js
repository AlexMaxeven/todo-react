const URL = 'http://localhost:3001/tasks';
const STORAGE_KEY = 'todo-react-tasks';

const headers = {
    'Content-Type': 'application/json',
};

const getLocalTasks = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

const setLocalTasks = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (_) {}
};

const tasksAPI = {
    getAll: async () => {
        try {
            const response = await fetch(URL);
            if (!response.ok) throw new Error('API unavailable');
            return response.json();
        } catch {
            return getLocalTasks();
        }
    },
    add: async (task) => {
        try {
            const response = await fetch(URL, {
                method: 'POST',
                headers,
                body: JSON.stringify(task),
            });
            if (!response.ok) throw new Error('API unavailable');
            return response.json();
        } catch {
            const newTask = {
                ...task,
                id: `local_${Date.now()}`,
            };
            const tasks = getLocalTasks();
            tasks.push(newTask);
            setLocalTasks(tasks);
            return newTask;
        }
    },
    delete: async (id) => {
        try {
            const response = await fetch(`${URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('API unavailable');
            return response;
        } catch {
            const tasks = getLocalTasks().filter((t) => t.id !== id);
            setLocalTasks(tasks);
            return { ok: true };
        }
    },
    deleteAll: async (tasks) => {
        try {
            await Promise.all(
                tasks.map(({ id }) =>
                    fetch(`${URL}/${id}`, { method: 'DELETE' })
                )
            );
        } catch {
            setLocalTasks([]);
        }
    },
    toggleComplete: async (id, isDone) => {
        try {
            const response = await fetch(`${URL}/${id}`, {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ isDone }),
            });
            if (!response.ok) throw new Error('API unavailable');
            return response;
        } catch {
            const tasks = getLocalTasks().map((t) =>
                t.id === id ? { ...t, isDone } : t
            );
            setLocalTasks(tasks);
            return { ok: true };
        }
    },
}

export default tasksAPI;