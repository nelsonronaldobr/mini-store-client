interface Props {
    children: JSX.Element[] | JSX.Element;
    className?: string;
}

export const ContainerSpinner = ({ children, className }: Props) => {
    return <div className={className}>{children}</div>;
};
