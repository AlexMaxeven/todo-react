import { useState, useEffect } from 'react';
import tasksAPI from '@/shared/api/tasks';
import RouterLink from '@/shared/components/RouterLink';
import styles from './TaskPage.module.css';

const blockStyle = {
    textAlign: 'left',
    minWidth: 404,
    maxWidth: 404,
    width: '100%',
};

const TaskPage = (props) => {
    const { params } = props;
    const taskId = params.id;
    const [task, setTask] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

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

    // Плавна поява контенту після завантаження задачі
    useEffect(() => {
        if (isLoading || hasError || !task) return;
        const id = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setContentVisible(true);
            });
        });
        return () => cancelAnimationFrame(id);
    }, [isLoading, hasError, task]);

    const wrapperClass = [
        styles.wrapper,
        hasError && styles.wrapperError,
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClass} style={blockStyle}>
            {isLoading && (
                <>
                    <RouterLink to="/" className={styles.backLink}>Назад до списку</RouterLink>
                    <p className={styles.placeholder}>Завантаження...</p>
                </>
            )}
            {hasError && (
                <>
                    <RouterLink to="/" className={styles.backLink}>Назад до списку</RouterLink>
                    <p className={styles.placeholder}>Задачу не знайдено</p>
                </>
            )}
            {!isLoading && !hasError && task && (
                <div
                    className={`${styles.contentWrap} ${contentVisible ? styles.contentVisible : ''}`}
                >
                    <RouterLink to="/" className={styles.backLink}>
                        Назад до списку
                    </RouterLink>
                    <h1 className={styles.title}>{task.title}</h1>
                    <div className={styles.statusRow}>
                        <span className={styles.statusLabel}>Статус:</span>
                        <span className={task.isDone ? styles.statusDone : styles.statusNotDone}>
                            {task.isDone ? 'Виконано' : 'Не виконано'}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskPage;