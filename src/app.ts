import './components';
import './styles/main.less';
import {
    notFoundError,
    PAGE_ROUTES_MAP,
} from './pages';
import {Router} from "./helpers/router";
import {Renderer} from "./helpers/renderer";

function getRoot (rootSelector: string): HTMLElement {
    const root = document.querySelector(rootSelector);

    if (root instanceof HTMLElement) {
        return root;
    }
    throw new Error("Root element not found!");
}

export default class App {
    private readonly _root: HTMLElement;
    private readonly _router: Router;
    private readonly _renderer: Renderer;

    constructor (rootSelector: string) {
        this._root = getRoot(rootSelector);
        this._renderer = new Renderer(this._root);
        this._router = new Router(PAGE_ROUTES_MAP, this._renderer.render, notFoundError);
    }

    /**
     * @public
     */
    init () {
        this._router.init();
    }
}