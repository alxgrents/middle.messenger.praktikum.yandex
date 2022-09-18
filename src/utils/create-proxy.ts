export type ProxyConfig = {
    onUpdate: <T extends any>(key: string, oldValue: T, newValue: T) => any,
};

export function createProxy <T extends Record<string, any>>(
    target: T,
    config: ProxyConfig,
): T {
    return new Proxy<T>(target, {
        set(target: T, key: string, value: any, receiver: any): boolean {
            const oldValue = target[key];
            const result = Reflect.set(target, key, value, receiver);

            // Намеренно выносим вызов коллбека после собственно самого изменения свойства
            if (oldValue !== value) {
                config.onUpdate(key, oldValue, value);
            }

            return result;
        },
    });
}