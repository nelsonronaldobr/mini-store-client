import { ModalOptions } from '.';

export interface Category {
    _id: string;
    name: string;
    status: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface InitialStateCategory {
    page: number;
    category: Category;
    modalOptions: ModalOptions;
}
