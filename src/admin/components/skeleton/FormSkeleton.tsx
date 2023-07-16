export const FormSkeleton = () => {
    return (
        <div className='p-4 space-y-4 animate-pulse'>
            <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>
            <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>
            <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>

            <div className='flex space-x-4'>
                <div className='flex-1'>
                    <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>
                </div>
                <div className='flex-1'>
                    <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>
                </div>
            </div>

            <div className='h-40 bg-gray-200 rounded dark:bg-gray-700'></div>

            <div className='flex space-x-4'>
                <div className='flex-1'>
                    <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>
                </div>
                <div className='flex-1'>
                    <div className='h-8 bg-gray-200 rounded dark:bg-gray-700'></div>
                </div>
            </div>
            <div className='h-40 bg-gray-200 rounded dark:bg-gray-700'></div>

            <button className='w-1/2 py-2 mx-auto bg-gray-200 rounded dark:bg-gray-700'></button>
        </div>
    );
};
