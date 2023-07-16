interface Props {
    length: number
}
export const SkeletonGallery = ({ length }: Props) => {
    return (
        <>
            {
                Array.from({ length }).map((_, index) => (
                    <div
                        className='bg-gray-200 relative'
                        key={index}>
                        <div className='dark:bg-gray-700 animate-pulse bg-gray-300 h-[212px] w-full'></div>
                    </div>
                ))
            }</>
    )
}
