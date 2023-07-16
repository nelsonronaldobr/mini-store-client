import { useGetProdutcs } from '../../hooks';

export const StorePage = () => {
    const { data } = useGetProdutcs();
    return (
        <div>
            {data?.products.map((category) => (
                <div key={category._id} className='block'>
                    <h2 className='text-white p-5 my-2'>
                        {category.category_name}
                    </h2>
                    <ul className='grid grid-cols-3 gap-5'>
                        {category.products.map((product) => (
                            <li
                                key={product._id}
                                className='bg-white col-span-1'>
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                                <p>{product.description}</p>
                                <img
                                    src={product.image_paths[0]?.url ?? ''}
                                    alt=''
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};
