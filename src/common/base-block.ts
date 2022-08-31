import EventEmitter from '../helpers/event-emitter';
import {
    readBlockOptions,
    proxyPropsFactory,
    removeEvents,
    addEvents,
    compileTemplateProps,
    replaceAllMockElements,
} from './base-block-utils';
import uniqueId from '../utils/unique-id';
import {
    BaseBlockChildren, BaseBlockEventListener,
    BaseBlockOptions,
    BaseBlockProps,
} from './types';

enum Events {
    init = 'init',
    componentDidMount = 'componentDidMount',
    render = 'render',
}

abstract class BaseBlock {
    public readonly id = uniqueId();

    private readonly _events = new EventEmitter();
    private _originalDisplay?: string;

    protected readonly _props: BaseBlockProps;

    protected readonly _children: BaseBlockChildren;

    private readonly _tag: string;

    private _container: HTMLElement;

    protected constructor(options: BaseBlockOptions = {}, tag: string = 'div') {
        const {
            children,
            props,
        } = readBlockOptions(options);

        this._tag = tag;
        this._children = children;
        this._props = proxyPropsFactory(props, {
            onUpdate: this._onUpdate.bind(this),
        });
        this._addEventListeners();
        this._events.emit(Events.init);
    }

    public getContent(): HTMLElement {
        return this._container;
    }

    public update(props: Record<string, any>): void {
        Object.assign(this._props, props);
    }

    /**
     * Метод реализован для того, чтобы былв возможность вложенности компонентов
     * Метод будет вызываться для детей при componentDidMount родителя
     */
    public dispatchComponentDidMount(): void {
        this._events.emit(Events.componentDidMount);
    }

    protected componentDidMount(): void {}

    protected abstract render(): string | DocumentFragment;

    protected setContainerAttribute(attributeName: string) {
        if (attributeName in this._props) {
            this._container.setAttribute(attributeName, this._props[attributeName]);
        }
    }

    protected compile(template: (props?: any) => string, props: BaseBlockProps): DocumentFragment {
        const propsForTemplate = compileTemplateProps(this._children, props);

        const fragment = document.createElement('template');

        fragment.innerHTML = template(propsForTemplate);

        replaceAllMockElements(fragment.content, Object.values(this._children));

        return fragment.content;
    }

    private _addEventListeners() {
        this._events.once(Events.init, this._init.bind(this));
        this._events.once(Events.componentDidMount, this._componentDidMount.bind(this));
        this._events.on(Events.render, this._render.bind(this));
    }

    private _createContainer(): void {
        this._container = document.createElement(this._tag);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        if (this._children !== undefined) {
            Object.values(this._children).forEach((item) => {
                if (Array.isArray(item)) {
                    item.forEach((subItem) => subItem.dispatchComponentDidMount());
                } else {
                    item.dispatchComponentDidMount();
                }
            });
        }
    }

    private _init() {
        this._createContainer();
        this.dispatchComponentDidMount();
        this._events.emit(Events.render);
    }

    private _onUpdate() {
        this._events.emit(Events.render);
    }

    private _render() {
        removeEvents(this._container, this._props.events);
        const block = this.render();

        if (typeof block === 'string') {
            /*
            todo
                Подумать и придумать что-то получше
                ----------------------------------
                Этот небезопасный метод для упрощения логики
                Используйте шаблонизатор из npm или напишите свой безопасный
                Нужно не в строку компилировать (или делать это правильно),
                либо сразу в DOM-элементы возвращать из compile DOM-ноду
            */
            this._container.innerHTML = block;
        } else {
            this._container.innerHTML = '';
            this._container.appendChild(block);
        }
        addEvents(this._container, this._props.events);

        this._setContainerAttributes();
    }

    protected addBlockEvent(eventName: string, callback: BaseBlockEventListener) {
        this.getContent().addEventListener(eventName, callback);
        if (this._props.events) {
            const listeners = this._props.events[eventName];
            if (listeners === undefined) {
                this._props.events[eventName] = callback;
            } else if (typeof listeners === 'function') {
                this._props.events[eventName] = [listeners, callback];
            } else if (Array.isArray(listeners)) {
                listeners.push(callback);
            }
        } else {
            this._props.events = { [eventName]: callback };
        }
    }

    private _setContainerAttributes() {
        this.setContainerAttribute('type');
        this.setContainerAttribute('href');
        this.setContainerAttribute('name');
        this.setContainerAttribute('action');
        this.setContainerAttribute('class');
    }

    public hide (): void {
        const originalDisplay = this.getContent().style.display;
        if (originalDisplay !== 'none') {
            this._originalDisplay = originalDisplay || 'block';
        }
        this.getContent().style.display = 'none';
    }

    public show (): void {
        if (this._originalDisplay) {
            console.log('_originalDisplay', this._originalDisplay);
            this.getContent().style.display = this._originalDisplay;
        }
    }
}

export default BaseBlock;
