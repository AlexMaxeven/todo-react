const URL = 'http://localhost:3001/tasks';
const STORAGE_KEY = 'todo-react-tasks';

const headers = { 'Content-Type': 'application/json' };

let useLocalOnly = false;

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
        if (useLocalOnly) return getLocalTasks();
        try {
            const response = await fetch(URL);
            if (!response.ok) throw new Error();
            return response.json();
        } catch {
            useLocalOnly = true;
            return getLocalTasks();
        }
    },
    add: async (task) => {
        if (useLocalOnly) {
            const newTask = { ...task, id: `local_${Date.now()}` };
            const tasks = [...getLocalTasks(), newTask];
            setLocalTasks(tasks);
            return newTask;
        }
        const response = await fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        });
        return response.json();
    },
    delete: async (id) => {
        if (useLocalOnly) {
            const tasks = getLocalTasks().filter((t) => t.id !== id);
            setLocalTasks(tasks);
            return { ok: true };
        }
        return fetch(`${URL}/${id}`, { method: 'DELETE' });
    },
    deleteAll: async (tasks) => {
        if (useLocalOnly) {
            setLocalTasks([]);
            return;
        }
        await Promise.all(
            tasks.map(({ id }) => fetch(`${URL}/${id}`, { method: 'DELETE' }))
        );
    },
    toggleComplete: async (id, isDone) => {
        if (useLocalOnly) {
            const tasks = getLocalTasks().map((t) =>
                t.id === id ? { ...t, isDone } : t
            );
            setLocalTasks(tasks);
            return { ok: true };
        }
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ isDone }),
        });
    },
};

export default tasksAPI;
