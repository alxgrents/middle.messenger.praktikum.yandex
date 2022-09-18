type AbstractCallback = (...args: any[]) => any;
type Listener = {
    callback: AbstractCallback,
    once?: boolean,
};
type Listeners = Listener[];
type ListenersMap = Record<string, Listeners>;

function listenerFactory(callback: AbstractCallback, once?: boolean): Listener {
    return { callback, once: !!once };
}

export default class EventEmitter <T extends string> {
    private readonly _listeners: ListenersMap = {};

    private _getListeners(eventName: string): Listeners {
        if (!Array.isArray(this._listeners[eventName])) {
            this._listeners[eventName] = [];
        }

        return this._listeners[eventName];
    }

    public on(eventName: T, callback: AbstractCallback): void {
        this._getListeners(eventName).push(listenerFactory(callback));
    }

    public once(eventName: T, callback: AbstractCallback): void {
        this._getListeners(eventName).push(listenerFactory(callback, true));
    }

    public emit(eventName: T, ...args: any): void {
        // todo Придумать удаление листениров с флагом "once"  получше
        this._getListeners(eventName).forEach((listener) => listener.callback(...args));
        this._listeners[eventName] = this._getListeners(eventName)
            .filter((listener) => !listener.once);
    }

    public off(eventName: T, callback: AbstractCallback): void {
        this._listeners[eventName] = this._getListeners(eventName)
            .filter((listener) => listener.callback !== callback);
    }
}
