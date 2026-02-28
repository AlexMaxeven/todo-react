// У production задається в .env.production (VITE_BASE_URL=/todo-react); локально — '/'
export const BASE_URL = import.meta.env.VITE_BASE_URL ?? '/';