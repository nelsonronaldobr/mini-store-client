// Helper para traducir fechas en formato ISO 8601
export const formatDate = (isoDate: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(isoDate);
    return date.toLocaleDateString('es-ES', options);
};
