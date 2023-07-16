type mode = 'dark' | 'light';

export const getThemeInStorage = (): mode => {
    return (localStorage.getItem('theme') as mode) || 'light';
};
