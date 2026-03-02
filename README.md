# Todo — React + Vite

Todo-додаток на React та Vite: список задач, сторінка задачі, пошук та деплой на GitHub Pages.

## Що є в проєкті

- **Головна** — список задач (додавання, видалення, позначка «виконано»), пошук, кнопка «Show first incomplete task».
- **Сторінка задачі** (`/tasks/:id`) — заголовок, статус, посилання «Back to list».
- Маршрутизація через кастомний Router (підтримка `BASE_URL` для GitHub Pages).
- Дані: `localStorage` або json-server (перемикач через `VITE_STATIC_BACKEND` у `.env.production`).

## Роути

| Шлях        | Сторінка   | Опис              |
|------------|------------|-------------------|
| `/`        | TasksPage  | Головна, список   |
| `/tasks/:id` | TaskPage | Сторінка однієї задачі |
| `*`        | 404        | Not found         |

Роути задані в `src/app/App.jsx`, матчинг і параметри — у `src/app/routing/Router.jsx` (`matchPath`, `getCurrentPath`).

## Хуки та де використовуються

**Роутинг**

- `useRoute` — `src/app/routing/Router.jsx`. Повертає поточний path, підписаний на `popstate`.

**Задачі (entities/todo)**

- `useTasks` — `src/entities/todo/model/useTasks.js`. Стан списку задач: `useReducer(tasksReducer)`, пошук, додавання/видалення/toggle, вихід на сторінку задачі (`isExitingToTask`). Використовується в `TaskContext`.
- `useInCompleteTaskScroll` — `src/entities/todo/model/useInCompleteTaskScroll.js`. `useRef` на першу невиконану задачу для scroll. Результат у `TaskContext` як `firstIncompleteTaskRef`.
- `useTaskLocalStorage` — `src/entities/todo/model/useTaskLocalStorage.js`. Збереження/завантаження задач у localStorage (у поточному коді не підключено).

**Контекст**

- `TaskContext` — `src/entities/todo/model/TaskContext.jsx`. Об’єднує `useTasks` і `useInCompleteTaskScroll`, через `useMemo` віддає значення контексту. Контекст використовується в: `Todo`, `AddTaskForm`, `SearchTaskForm`, `TodoInfo`, `TodoList`, `TodoItem`.

**Сторінки**

- **TaskPage** (`src/pages/TaskPage/TaskPage.jsx`): `useState` (task, isLoading, hasError, pageRevealed), `useEffect` (завантаження задачі по id, запуск показу сторінки).
- **Todo** (`src/widgets/Todo/Todo.jsx`): `useContext(TaskContext)`, `useState(isReady)`, `useEffect` (два rAF для isReady).

**Фічі**

- **AddTaskForm**: `useContext(TaskContext)`, `useState` (newTaskTitle, error).
- **SearchTaskForm**: `useContext(TaskContext)` (searchQuery, setSearchQuery).
- **TodoInfo**: `useContext(TaskContext)`, `useMemo` для підрахунку виконаних.

**Спільні**

- `useCombinedRefs` — `src/shared/hooks/useCombinedRefs.js`. Об’єднує кілька ref у один callback ref.

**Оптимізація**

- `memo` — у `TodoItem`, `TodoList`, `TodoInfo`.

## Стек

- React  
- Vite  
- CSS Modules  

## Збірка та запуск

```bash
npm install
npm run dev
```

Збірка для продакшену (наприклад, для GitHub Pages з base `/todo-react/`):

```bash
npm run build
```

Перегляд збірки локально (base `/`):

```bash
npm run build:preview
npm run preview
```
