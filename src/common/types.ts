import BaseBlock from "./base-block";

export type ProxyConfig = {
    onUpdate: <T extends any>(key: string, oldValue: T, newValue: T) => any,
};
export type BaseBlockEventListener = (event: Event) => any;
// Если на один и тот же ивент навешиывается несколько листенеров, то передаём через массив
export type BaseBlockEvents = Record<string, BaseBlockEventListener | BaseBlockEventListener[]>
export type BaseBlockProps = Partial<{
    class: string,
    type: string,
    href: string,
    events: BaseBlockEvents,
    [key: string]: any,
}>;
export type BaseBlockChildren = Record<string, BaseBlock | BaseBlock[]>;
export type BaseBlockOptions = {
    [key: string]: BaseBlock | BaseBlock[] | any,
} & BaseBlockProps;