export type Theme = 'light' | 'dark';
export interface InitialStateUi {
    theme: Theme;
    openShoppingCart: boolean;
}

export interface ModalOptions {
    show: boolean;
    title: string;
}
