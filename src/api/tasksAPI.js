const URL = 'http://localhost:3001/tasks';

const headers = {
    'Content-Type': 'application/json',
}

const tasksAPI = {
    getAll: async () => {
        const response = await fetch(URL);
        return response.json();
    },
    add: async (task) => {
        const response = await fetch(URL, {
            method: 'POST',
            headers,
            body: JSON.stringify(task),
        });
        return response.json();
    },
    delete: async (id) => {
        return fetch(`${URL}/${id}`, {
            method: 'DELETE',
        });
    },
    deleteAll: async (tasks) => {
        return Promise.all(
            tasks.map(({ id }) => tasksAPI.delete(id))
        );
    },
    toggleComplete: async (id, isDone) => {
        return fetch(`${URL}/${id}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify({ isDone }),
        });
    },
}

export default tasksAPI;