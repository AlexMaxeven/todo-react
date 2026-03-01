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
    const [pageRevealed, setPageRevealed] = useState(false);

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

    // Сторінка одразу opacity 0, після першого рендеру — анімація до 100% за 2 с
    useEffect(() => {
        let cancelled = false;
        requestAnimationFrame(() => {
            if (cancelled) return;
            requestAnimationFrame(() => {
                if (cancelled) return;
                setTimeout(() => {
                    if (!cancelled) setPageRevealed(true);
                }, 0);
            });
        });
        return () => { cancelled = true; };
    }, []);

    const wrapperClass = [
        styles.wrapper,
        hasError && styles.wrapperError,
        pageRevealed && styles.wrapperRevealed,
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClass} style={blockStyle}>
            {isLoading && (
                <RouterLink to="/" className={styles.backLink}>Назад до списку</RouterLink>
            )}
            {hasError && (
                <>
                    <RouterLink to="/" className={styles.backLink}>Назад до списку</RouterLink>
                    <p className={styles.placeholder}>Задачу не знайдено</p>
                </>
            )}
            {!isLoading && !hasError && task && (
                <>
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
                </>
            )}
        </div>
    );
};

export default TaskPage;