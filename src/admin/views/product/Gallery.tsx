import { Navigate, useParams } from 'react-router-dom';
import {
    Dropzone,
    FormSkeleton,
    ImageProduct,
    SkeletonGallery
} from '../../components';
import { useImageMutations, useImages } from '../../hooks/products';
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';
import { Image } from '../../../store';

export const Gallery = () => {
    const { slug } = useParams();

    const { isLoading, isError, data, isFetching } = useImages({
        _slug: slug || ''
    });

    const [images, setImages] = useState<Image[]>([])

    const { isLoadingDelete, startDelete, startUpdateOrder } = useImageMutations();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        setImages(() => {
            const oldIndex = images.findIndex(image => image._id === active.id)
            const newIndex = images.findIndex(image => image._id === over?.id)
            const newOrder = arrayMove(images, oldIndex, newIndex)
            startUpdateOrder({ images: newOrder })
            return newOrder
        })

    };
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    useEffect(() => {
        if (data?.images) {
            setImages(data.images)
        }
    }, [data])


    if (isError) {
        return <Navigate to={'/admin/inventory/products'} replace={true} />;
    }

    return (
        <DndContext
            data-no-dnd="true"
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            sensors={sensors}>
            {isLoading ? (
                <FormSkeleton />
            ) : (
                <div className='flex flex-col gap-8'>
                    <SortableContext items={images.map(image => image._id)} strategy={horizontalListSortingStrategy}>
                        <h1 className='text-2xl dark:text-white font-semibold text-center mb-6'>
                            Gallery : {data?.product.name}
                        </h1>

                        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                            {isLoading || isLoadingDelete || isFetching ? (
                                <SkeletonGallery length={4} />
                            ) : images.length ? (
                                images.map((image) => (
                                    <ImageProduct
                                        key={image._id}
                                        image={image}
                                        startDelete={startDelete}

                                    />
                                ))
                            ) : (
                                <p className='dark:text-white text-lg col-span-full text-center'>
                                    No hay imagenes en la galeria de este
                                    producto, añade algunas.
                                </p>
                            )}
                        </div>
                    </SortableContext>
                    <Dropzone />
                </div>
            )}
        </DndContext>
    );
};
