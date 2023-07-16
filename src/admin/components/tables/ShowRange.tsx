interface Props {
    limit: number;
    page?: number;
    totalDocuments?: number;
}

export const ShowRange = ({ limit, page, totalDocuments }: Props) => {
    const itemsPerPage = limit;
    const currentPage = page || 1;
    const totalItems = totalDocuments || 0;
    const startIndex = (currentPage - 1) * itemsPerPage + 1;
    const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

    return (
        <div className='text-sm font-normal text-gray-500 dark:text-gray-400 flex gap-1'>
            Showing{' '}
            <p className='font-semibold text-gray-900 flex dark:text-white'>
                <span className='w-4 text-center'>{startIndex}</span>-
                <span className='w-4 text-center'>{endIndex}</span>
            </p>{' '}
            of{' '}
            <p className='font-semibold text-gray-900 dark:text-white'>
                {totalItems}
            </p>
        </div>
    );
};
