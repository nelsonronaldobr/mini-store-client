import { useState } from 'react';
import { RangeData } from '../store';
interface Props {
    data?: RangeData;
}
export const usePagination = ({ data }: Props) => {
    const [page, setPage] = useState(data?.page);

    const nextPage = (value: number) => {
        const next = Math.min(page! + value, data?.numberOfPages || 1);
        setPage(next);
    };

    const prevPage = (value: number) => {
        const next = Math.max(page! - value, 1);
        setPage(next);
    };

    return {
        page,
        nextPage,
        prevPage
    };
};
