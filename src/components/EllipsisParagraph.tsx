import { CSSProperties } from "react"

interface Props {
    className?: string,
    children: JSX.Element | JSX.Element[] | string
    style?: CSSProperties
}

export const EllipsisParagraph = ({ className, children }: Props) => {
    return (
        <p className={`w-48 text-ellipsis whitespace-nowrap overflow-hidden ${className}`}>{children}</p>
    )
}
