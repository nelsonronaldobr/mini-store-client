export const getEnvVariables = () => {
    return {
        VITE_API_URL: import.meta.env.VITE_API_URL,
        NODE_ENV: import.meta.env.NODE_ENV,
        VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL
    };
};
