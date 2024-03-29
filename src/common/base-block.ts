import EventEmitter from '../helpers/event-emitter';
import {
    readBlockOptions,
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
import {createProxy} from "../utils/create-proxy";

type BaseBlockEvents = 'init' | 'componentDidMount' | 'render';

abstract class BaseBlock {
    public readonly id = uniqueId();

    private readonly _events = new EventEmitter<BaseBlockEvents>();

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
        this._children = createProxy(children, {
            onUpdate: this._onUpdate.bind(this),
        });
        this._props = createProxy(props, {
            onUpdate: this._onUpdate.bind(this),
        });
        this._addEventListeners();
        this._events.emit('init');
    }

    public getContent(): HTMLElement {
        return this._container;
    }

    public update(options: BaseBlockOptions = {}): void {
        const {
            children,
            props,
        } = readBlockOptions(options);
        Object.assign(this._props, props);
        Object.assign(this._children, children);
    }

    /**
     * Метод реализован для того, чтобы была возможность вложенности компонентов
     * Метод будет вызываться для детей при componentDidMount родителя
     */
    public dispatchComponentDidMount(): void {
        this._events.emit('componentDidMount');
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
        this._events.once('init', this._init.bind(this));
        this._events.once('componentDidMount', this._componentDidMount.bind(this));
        this._events.on('render', this._render.bind(this));
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
        this._events.emit('render');
    }

    private _onUpdate() {
        this._events.emit('render');
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
        this.getContent().style.display = 'none';
    }

    public show (): void {
        this.getContent().style.display = '';
    }
}

export default BaseBlock;
