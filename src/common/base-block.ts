import proxyPropsFactory from "./proxy-props-factory";
import EventEmitter from "../helpers/event-emitter";

enum Events {
    init = 'init',
    componentDidMount = 'componentDidMount',
    render = 'render',
}

abstract class BaseBlock {
    private readonly _events = new EventEmitter();
    protected readonly _props: any;
    private readonly _tag: string;
    private _container: HTMLElement;

    protected constructor (props: any = {}, tag: string = 'div') {
        this._tag = tag;
        this._props = proxyPropsFactory(props, {
            onUpdate: this._onUpdate.bind(this),
        });
        this._addEventListeners();
        this._events.emit(Events.init);
    }

    public getContent (): HTMLElement {
        return this._container;
    }

    public update (props: any): void {
        Object.assign(this._props, props);
    }

    private _addEventListeners() {
        this._events.once(Events.init, this._init.bind(this));
        this._events.once(Events.componentDidMount, this.componentDidMount.bind(this));
        this._events.on(Events.render, this._render.bind(this));
    }

    private _createContainer(): void {
        this._container = document.createElement(this._tag);
    }

    private _init() {
        this._createContainer();
        this._events.emit(Events.componentDidMount);
        this._events.emit(Events.render);
    }

    private _onUpdate() {
        this._events.emit(Events.render);
    }

    private _render() {
        /*
        todo
            Подумать и придумать что-то получше
            ----------------------------------
            Этот небезопасный метод для упрощения логики
            Используйте шаблонизатор из npm или напишите свой безопасный
            Нужно не в строку компилировать (или делать это правильно),
            либо сразу в DOM-элементы возвращать из compile DOM-ноду
         */
        this._container.innerHTML = this.render();

        this.setContainerAttribute('type');
        this.setContainerAttribute('href');
        this.setContainerAttribute('class');
    }

    protected setContainerAttribute (attributeName: string) {
        if (this._props.hasOwnProperty(attributeName)) {
            this._container.setAttribute(attributeName, this._props[attributeName]);
        }
    }

    protected componentDidMount (): void {};
    protected abstract render(): string;
}

export default BaseBlock;