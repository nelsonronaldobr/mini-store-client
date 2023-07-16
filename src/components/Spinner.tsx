interface Props {
    className?: string;
    style?: React.CSSProperties;
    mini?: boolean;
}
export const Spinner = ({ className, style, mini = false }: Props) => {
    return mini ? (
        <div className={`sk-chase ${className}`} style={style}>
            <div className='sk-chase-dot before:bg-blue-500 dark:before:bg-white'></div>
            <div className='sk-chase-dot before:bg-blue-500 dark:before:bg-white'></div>
            <div className='sk-chase-dot before:bg-blue-500 dark:before:bg-white'></div>
            <div className='sk-chase-dot before:bg-blue-500 dark:before:bg-white'></div>
            <div className='sk-chase-dot before:bg-blue-500 dark:before:bg-white'></div>
            <div className='sk-chase-dot before:bg-blue-500 dark:before:bg-white'></div>
        </div>
    ) : (
        <div className={`sk-chase ${className}`} style={style}>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
            <div className='sk-chase-dot'></div>
        </div>
    );
};
