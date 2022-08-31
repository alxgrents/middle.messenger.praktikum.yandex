import Route from "./route";
import BaseBlock from "../common/base-block";
import {Renderer} from "./renderer";

class Router {
    private static __instance?: Router;
    private readonly _routes: Route[];
    private readonly _history: History;
    private readonly _renderer: Renderer;
    private _notFoundRoute?: Route;
    private _currentRoute: Route | null;

    public static getInstance (): Router {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    constructor () {
        if (Router.__instance) {
            return Router.__instance;
        }

        this._routes = [];
        this._renderer = new Renderer();
        this._history = window.history;
        this._currentRoute = null;

        Router.__instance = this;
    }

    use (pathname: string, blockCtor: typeof BaseBlock): Router {
        const route = new Route(pathname, blockCtor, this._renderer);

        this._routes.push(route);
        return this;
    }

    useNotFound (blockCtor: typeof BaseBlock): Router {
        this._notFoundRoute = new Route('', blockCtor, this._renderer);

        return this;
    }

    start () {
        window.onpopstate = () => this._onRoute(window.location.pathname);

        this._onRoute(window.location.pathname);
    }

    _onRoute (pathname: string) {
        const route = this._getRoute(pathname);
        if (!route) {
            if (this._notFoundRoute) {
                if (this._currentRoute) {
                    this._currentRoute.leave();
                }
                this._notFoundRoute.render();
            }

            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;

        route.render();
    }

    go (pathname: string): void {
        console.log('ROUTER go', pathname);
        this._history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    private _getRoute (pathname: string): Route | undefined {
        return this._routes.find(route => route.match(pathname));
    }
}

export default Router;