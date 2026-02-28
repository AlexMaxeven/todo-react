import { useState, useEffect } from 'react';
import tasksAPI from '@/shared/api/tasks';
import RouterLink from '@/shared/components/RouterLink';
import styles from './TaskPage.module.css';

const TaskPage = (props) => {
    const { params } = props;
    const taskId = params.id;
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        tasksAPI.getById(taskId)
            .then((taskData) => {
                setTask(taskData);
                setHasError(false);
            })
            .catch(() => {
                setHasError(true);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [taskId]);

    const toggleDone = () => {
        if (!task) return;
        const nextDone = !task.isDone;
        tasksAPI.toggleComplete(taskId, nextDone).then(() => {
            setTask((prev) => ({ ...prev, isDone: nextDone }));
        });
    };

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <RouterLink to="/" className={styles.backLink}>Назад до списку</RouterLink>
                <p>Завантаження...</p>
            </div>
        );
    }

    if (hasError) {
        return (
            <div className={styles.error}>
                <RouterLink to="/" className={styles.backLink}>Назад до списку</RouterLink>
                <p>Задачу не знайдено</p>
            </div>
        );
    }

    return (
        <article className={styles.page}>
            <RouterLink to="/" className={styles.backLink}>
                Назад до списку
            </RouterLink>
            <h1 className={styles.title}>{task.title}</h1>
            <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Статус:</span>
                <span className={task.isDone ? styles.statusDone : styles.statusNotDone}>
                    {task.isDone ? 'Виконано' : 'Не виконано'}
                </span>
                <button
                    type="button"
                    className={styles.toggleDoneButton}
                    onClick={toggleDone}
                >
                    {task.isDone ? 'Позначити не виконаним' : 'Позначити виконаним'}
                </button>
            </div>
        </article>
    );
};

export default TaskPage;