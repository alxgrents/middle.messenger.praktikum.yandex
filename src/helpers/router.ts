import {RenderData} from "./renderer";
type Route =  () => RenderData;
export type RouteMap = Record<string, Route>
type RerenderCallback = (html: RenderData) => void;

export class Router {
    private readonly _map: RouteMap;
    private readonly _rerenderCallback: RerenderCallback;
    private readonly _notFoundRoute?: Route;

    constructor (map: RouteMap, rerenderCallback: RerenderCallback, notFoundRoute?: Route) {
        this._map = map;
        this._rerenderCallback = rerenderCallback;
        this._notFoundRoute = notFoundRoute;
    }

    public init (): void {
        this._addEventListeners();
        this._onLocationHashChange();
    }

    private _addEventListeners (): void {
        window.addEventListener('hashchange', () => this._onLocationHashChange());
    }

    private _onLocationHashChange (): void {
        const render = this._map[this._getCurrentRoute()] || this._notFoundRoute;

        if (typeof render === 'function') {
            this._rerenderCallback(render());
        }
    }

    private _getCurrentRoute (): string {
        /*
        todo:
            Придумать метод роутинга получше, чем на хешах.
            Когда подумаю, то возможно метод нужно поменять на статичный. Пока не меняю
        */

        return window.location.hash.replace('#', '');
    }
}