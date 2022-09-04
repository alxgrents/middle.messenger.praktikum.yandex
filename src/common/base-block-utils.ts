import BaseBlock from './base-block';
import {
    BaseBlockChildren,
    BaseBlockEventListener,
    BaseBlockEvents,
    BaseBlockOptions,
    BaseBlockProps,
} from './types';

function baseBlockArrayCondition(item: any | BaseBlock | BaseBlock[]): boolean {
    return Array.isArray(item) && item.every((subItem) => subItem instanceof BaseBlock);
}

export function readBlockOptions(options: BaseBlockOptions): {
    children: BaseBlockChildren,
    props: BaseBlockProps,
} {
    const children: BaseBlockChildren = {};
    const props: BaseBlockProps = {};

    Object.entries(options).forEach(([key, item]) => {
        if (item instanceof BaseBlock) {
            children[key] = item;
        } else if (baseBlockArrayCondition(item)) {
            children[key] = item;
        } else {
            props[key] = item;
        }
    });

    return { children, props };
}

export function compileTemplateProps(
    children: BaseBlockChildren,
    props: BaseBlockProps,
): Record<string, any> {
    const propsForTemplate = { ...props };
    Object.entries(children)
        .forEach(([key, item]) => {
            if (item instanceof BaseBlock) {
                propsForTemplate[key] = createMockElementHtml(item);
            } else if (baseBlockArrayCondition(item)) {
                propsForTemplate[key] = item.map(createMockElementHtml);
            }
        });

    return propsForTemplate;
}

function replaceMockElement(root: DocumentFragment, child: BaseBlock) {
    const mock = root.querySelector(`[data-id="${child.id}"]`);
    if (mock) {
        mock.replaceWith(child.getContent());
    } else {
        // eslint-disable-next-line no-console
        console.error('can not replace!', child.id, mock, child);
    }
}

export function replaceAllMockElements(
    root: DocumentFragment,
    children: Array<BaseBlock | BaseBlock[]>,
) {
    children.forEach((item) => {
        if (item instanceof BaseBlock) {
            replaceMockElement(root, item);
        } else if (baseBlockArrayCondition(item)) {
            item.forEach((subItem) => replaceMockElement(root, subItem));
        }
    });
}

export function createMockElementHtml(item: BaseBlock): string {
    return `<div data-id="${item.id}">${item.id}</div>`;
}

function iterateByEvents(
    events: BaseBlockEvents,
    callback: (eventName: string, subItem: BaseBlockEventListener) => void,
): void {
    Object.entries(events).forEach(([eventName, item]) => {
        if (Array.isArray(item)) {
            item.forEach((subItem) => callback(eventName, subItem));
        } else if (typeof item === 'function') {
            callback(eventName, item);
        }
    });
}

export function addEvents(element: HTMLElement, events?: BaseBlockEvents) {
    if (events) iterateByEvents(events, element.addEventListener.bind(element));
}

// Удаляет только те евенты, которые есть в events
export function removeEvents(element: HTMLElement, events?: BaseBlockEvents) {
    if (events) iterateByEvents(events, element.removeEventListener.bind(element));
}
