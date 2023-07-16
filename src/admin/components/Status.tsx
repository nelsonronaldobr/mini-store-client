
interface Props {
    status: string
}
export const Status = ({ status }: Props) => {
    return (
        <div className='flex items-center'>
            <div className={`h-2.5 w-2.5 rounded-full ${status === 'active' ? 'bg-blue-500' : 'bg-red-500'} mr-2`}></div>{' '}
            {status === 'active' ? 'Activo' : 'Retirado'}
        </div>
    )
}
