export const darkMode = (mode: boolean) => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (mode) {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.remove('light');
        localStorage.setItem('theme', 'light');
    }
};
