import { toast } from 'react-hot-toast';
import {
    useDeleteImageByProductMutation,
    useGetImageByProductQuery,
    useUpdateOrderImagesByProductMutation,
    useUploadImagesByProductMutation
} from '../../../store/apis';
import { ErrorRTKQuery, Image } from '../../../store';
import { useProductStore } from '../../../hooks';
import { useEffect } from 'react';

export const useImages = ({ _slug }: { _slug: string }) => {
    const { startSetProduct } = useProductStore();
    const { data, isError, isLoading, isFetching, isSuccess } =
        useGetImageByProductQuery(
            {
                _slug
            },
            {
                refetchOnMountOrArgChange: true
            }
        );

    useEffect(() => {
        if (data?.product) {
            startSetProduct(data.product);
        }
    }, [data]);

    return { data, isError, isLoading, isFetching, isSuccess };
};

export const useImageMutations = () => {
    const { product } = useProductStore();

    const [deleteImage, { isLoading: isLoadingDelete }] =
        useDeleteImageByProductMutation();

    const startDelete = ({ imageName }: { imageName: string }) => {
        toast.promise(
            deleteImage({ _id: product._id, imageName }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages }) => {
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };

    const [uploadImages, { isLoading: isLoadingUpload }] =
        useUploadImagesByProductMutation();
    const startUploadImages = ({ images }: { images: FormData }) => {
        toast.promise(
            uploadImages({ _id: product._id, images }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages }) => {
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };
    const [updateImages] = useUpdateOrderImagesByProductMutation();
    const startUpdateOrder = ({ images }: { images: Image[] }) => {
        toast.promise(
            updateImages({ _id: product._id, images }).unwrap(),
            {
                loading: 'loading',
                success: ({ messages }) => {
                    return messages.msg;
                },
                error: (error: ErrorRTKQuery) => {
                    return error.data.messages.msg;
                }
            },
            {
                className: 'dark:text-white dark:bg-gray-800'
            }
        );
    };

    return {
        startDelete,
        isLoadingDelete,
        isLoadingUpload,
        startUploadImages,
        startUpdateOrder
    };
};
