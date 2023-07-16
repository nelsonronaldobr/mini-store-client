import LogoBurger from '../assets/logoBurgerSmall.png';

interface Props {
    className?: string;
    style?: React.CSSProperties;
}

export const Logo = ({ className = 'w-36', style }: Props) => {
    return (
        <img
            src={LogoBurger}
            alt='Logo website'
            className={`object-cover ${className}`}
            style={style}
        />
    );
};
