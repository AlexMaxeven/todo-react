// Завжди з vite.config.js → base; не залежить від .env (на GitHub буде '/todo-react/', локально '/')
export const BASE_URL = import.meta.env.BASE_URL || '/';