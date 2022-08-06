export function freeze <T extends any>(source: T): T {
    if (typeof source === 'object') {
        // @ts-ignore
        Object.entries(source).forEach(([key, value]) => source[key] = freeze(value));
    }

    return Object.freeze(source);
}