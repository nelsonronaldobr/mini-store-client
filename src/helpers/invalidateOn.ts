export function invalidateOn<T>({
    success = [],
    error = []
}: {
    success?: T[];
    error?: T[];
}) {
    return (result: unknown): T[] => (result ? success : error);
}
