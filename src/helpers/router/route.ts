import BaseBlock from "src/common/base-block";
import {Renderer} from "../renderer";

export type RouteOptions = {
    notAuthRedirect?: string,
    authRedirect?: string,
}

export class Route {
    public options: RouteOptions;
    private _pathname: string;
    private readonly _renderer;
    private readonly _blockCtor: typeof BaseBlock;
    private _block: BaseBlock | null;

    constructor (pathname: string, blockCtor: typeof BaseBlock, renderer: Renderer, options: RouteOptions = {}) {
        this._pathname = pathname;
        this._blockCtor = blockCtor;
        this._block = null;
        this._renderer = renderer;
        this.options = options;
    }

    navigate (pathname: string): void {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match (pathname: string) {
        return pathname === this._pathname
            || pathname === `/${this._pathname}`
            || new RegExp(`/${this._pathname}[#\?]?\w*`).test(pathname);
    }

    render () {
        if (!this._block) {
            //@ts-ignore
            this._block = new this._blockCtor(this._props) as BaseBlock;
            this._renderer.render(this._block);
            return;
        }

        this._block.show();
    }
}