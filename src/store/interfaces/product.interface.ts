export interface InitialStateProduct {
    page: number;
    product: Product;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    status: Status;
    stock: number;
    toppings: boolean;
    extraItems: boolean;
    addon: boolean;
    image_paths: ImagePath[];
    options: Option[];
    typeOfPersons: number;
    slug: string;
    createdAt: string;
    updatedAt: string;
}

export interface ImagePath {
    name: string;
    url: string;
    _id: string;
}

export interface Option {
    name: string;
    _id: string;
}

export enum Status {
    Active = 'active',
    Retired = 'retired'
}
