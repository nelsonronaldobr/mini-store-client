import { XMarkIcon } from "@heroicons/react/24/solid"
import { Image } from "../../store"
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
    image: Image,
    startDelete: ({ imageName }: {
        imageName: string;
    }) => void
}

export const ImageProduct = ({ image, startDelete }: Props) => {

    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: image._id
    })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    }
    return (
        <div
            style={style}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
        >
            <div className='relative border border-gray-100 rounded-lg animate__animated animate__fadeIn'>
                <img
                    src={image.url}
                    alt={`Imagen ${image.name}`}
                    className='h-[212px] w-full transition-transform duration-300 hover:scale-110  object-cover'
                />
                <span
                    onClick={() => {
                        startDelete({
                            imageName: image.name
                        })
                    }
                    }
                    className='absolute cursor-pointer top-2 right-2 px-1 rounded bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center'>
                    <XMarkIcon className='text-xs' />
                </span>
            </div>

        </div>
    )
}
