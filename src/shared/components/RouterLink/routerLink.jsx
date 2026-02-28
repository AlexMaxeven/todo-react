import { BASE_URL } from '@/shared/constans';

const RouterLink = (props) => {
    const {
        to,
        children,
        onBeforeNavigate,
        onClick,
        ...rest
    } = props;

    const fullPath = BASE_URL === '/' ? to : `${BASE_URL}${to}`.replace(/\/\/+/, '/');

    const handleClick = async (event) => {
        event.preventDefault();
        onClick?.(event);
        if (onBeforeNavigate) {
            await Promise.resolve(onBeforeNavigate());
        }
        window.history.pushState({}, '', fullPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <a href={fullPath} onClick={handleClick} {...rest}>
            {children}
        </a>
    );
};

export default RouterLink;