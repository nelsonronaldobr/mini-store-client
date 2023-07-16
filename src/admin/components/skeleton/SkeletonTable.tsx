export const SkeletonTable = () => {
    return (
        <table className='w-full rounded-xl'>
            <thead>
                <tr>
                    <th className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></th>
                    <th className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></th>
                    <th className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></th>
                    <th className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                </tr>
                <tr>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                </tr>
                <tr>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                    <td className='w-1/4 h-12 dark:bg-gray-700 animate-pulse bg-gray-300'></td>
                </tr>
            </tbody>
        </table>
    );
};
