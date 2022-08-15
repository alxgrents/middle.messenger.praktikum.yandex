// eslint-disable-next-line import/prefer-default-export
export function freeze <T extends any>(source: T): T {
    if (typeof source === 'object') {
        // @ts-ignore
        // eslint-disable-next-line no-return-assign,no-param-reassign
        Object.entries(source).forEach(([key, value]) => source[key] = freeze(value));
    }

    return Object.freeze(source);
}
