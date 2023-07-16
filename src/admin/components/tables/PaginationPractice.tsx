interface Props {
    children: JSX.Element | JSX.Element[];
}

export const PaginationPractice = ({ children }: Props) => {
    return (
        <nav
            className='flex items-center justify-between pt-4'
            aria-label='Table navigation'>
            {children}
        </nav>
    );
};
