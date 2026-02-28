import { BASE_URL } from '@/shared/constans';

const RouterLink = (props) => {
    const {
        to,
        children,
        ...rest
    } = props

    const fullPath = BASE_URL === '/' ? to : `${BASE_URL}${to}`.replace(/\/\/+/, '/');

    const handleClick = (event) => {
        event.preventDefault();
        window.history.pushState({}, '', fullPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
    }

    return (
        <a href={fullPath} onClick={handleClick} {...rest}>
            {children}
        </a>
    )
}

export default RouterLink;