import { FolderIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { MouseEvent, useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { useImageMutations } from '../hooks/products';
import { Spinner } from '../../components';

interface FileImage extends File {
    preview: string;
}

export const Dropzone = () => {

    const { startUploadImages, isLoadingUpload } = useImageMutations()
    const [files, setFiles] = useState<FileImage[]>([]);
    /* const [rejected, setRejected] = useState<FileRejection[]>([]); */

    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {
            // Do something with the files
            /* console.log(fileRejections);

            if (fileRejections.length) {
                setRejected((previusRejectedFiles) => [
                    ...previusRejectedFiles,
                    ...fileRejections
                ]);
            } */

            if (acceptedFiles.length) {

                if (files.length >= 4) return toast('Demasiados archivos. Por favor, selecciona un máximo de 4 archivos.', {
                    duration: 5000,
                    className: 'dark:text-white dark:bg-red-600',
                    position: 'top-right'
                });
                setFiles((previousFiles) => [
                    ...previousFiles,
                    ...acceptedFiles.map((file) =>
                        Object.assign(file, {
                            preview: URL.createObjectURL(file)
                        })
                    )
                ])
            }
        },
        []
    );

    const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        const formData = new FormData()

        files.forEach((file) => {
            formData.append('images', file);
        });
        startUploadImages({ images: formData })
        setFiles([])
    };

    const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
        const invalidSizeFiles = fileRejections.filter((rejection) =>
            rejection.errors.some(
                (error) =>
                    error.code === 'file-too-large' ||
                    error.code === 'file-too-small' ||
                    error.code === 'too-many-files'
            )
        );
        const invalidTypeFiles = fileRejections.filter((rejection) =>
            rejection.errors.some((error) => error.code === 'file-invalid-type')
        );

        if (invalidSizeFiles.length > 0) {
            const errorMessageSize =
                'Demasiados archivos. Por favor, selecciona un máximo de 4 archivos.';
            toast(errorMessageSize, {
                duration: 5000,
                className: 'dark:text-white dark:bg-red-600'
            });
        }

        if (invalidTypeFiles.length > 0) {
            const errorMessageType =
                'Algunos archivos tienen un tipo no válido. Por favor, sube archivos con un formato válido.';
            toast(errorMessageType, {
                duration: 5000,
                className: 'dark:text-white dark:bg-red-600'
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop,
        onDropRejected,
        maxFiles: 4
    });

    const handleRemoveImage = useCallback((index: number) => {
        setFiles((previousFiles) =>
            previousFiles.filter((_, i) => i !== index)
        );
    }, []);

    return (
        <div>
            <h2 className='text-2xl dark:text-white font-semibold text-center mb-6'>
                Upload Images
            </h2>
            <form className='grid md:grid-cols-2 grid-cols-1 gap-2 mb-6'>
                <div
                    {...getRootProps({
                        className: `border-dashed  border-2 p-4 h-80 grid place-content-center transition-all ${isDragActive ? 'border-blue-600' : 'border-gray-400'
                            }`
                    })}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <div className='animate__animated animate__fadeIn'>
                            <FolderIcon
                                className='mx-auto h-12 w-12 text-blue-600'
                                aria-hidden='true'
                            />
                            <p className='dark:text-blue-600 font-semibold text-center'>
                                Suelta los archivos aquí...
                            </p>
                        </div>
                    ) : (
                        <div className='animate__animated animate__fadeIn '>
                            <PhotoIcon
                                className='mx-auto h-12 w-12 text-gray-300'
                                aria-hidden='true'
                            />

                            <p className='dark:text-white font-semibold text-center'>
                                Arrastre y suelte algunos archivos aquí, o haga
                                clic para seleccionar archivos
                            </p>
                        </div>
                    )}
                </div>
                <div className='border-dashed border-2 border-blue-600 h-80 flex items-center justify-center flex-col gap-2 w-full px-4'>
                    <div className='grid grid-cols-2 grid-rows-2 gap-2 w-full'>
                        {files?.map((file, index) => (
                            <div key={index} className='relative'>
                                <img
                                    src={file.preview}
                                    className='object-cover block w-full h-24'
                                    alt={`Image ${index}`}
                                />
                                <span
                                    className='absolute cursor-pointer top-2 right-2 px-1 rounded bg-red-600 text-white text-xs w-6 h-6 flex items-center justify-center'
                                    onClick={() => handleRemoveImage(index)}>
                                    <XMarkIcon className='text-xs' />
                                </span>
                            </div>
                        ))}
                    </div>
                    <div>
                        <button
                            disabled={isLoadingUpload || files.length === 0}
                            onClick={handleSubmit}
                            className='disabled:opacity-50 focus:outline-none text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5'
                            type='submit'>
                            {
                                isLoadingUpload ? (
                                    <div className='flex gap-4'>
                                        <Spinner mini={true} className='w-4 h-4' />
                                        Loading
                                    </div>
                                ) : 'Upload Images to Gallery'
                            }
                        </button>
                    </div>
                </div>
            </form>
            {/* <h3 className='text-2xl dark:text-white font-semibold text-center mb-6'>
                Rejected Files
            </h3>
            <ul className='text-white'>
                {rejected.map(({ file, errors }) => (
                    <li
                        key={file.name}
                        className='flex justify-between items-center'>
                        <div>
                            <p>{file.name}</p>
                            <ul className='text-red-500'>
                                {errors?.map(({ code, message }) => (
                                    <li key={code}>{message}</li>
                                ))}
                            </ul>
                        </div>
                        <button
                            type='button'
                            className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>
                            {' '}
                            Remove
                        </button>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};
