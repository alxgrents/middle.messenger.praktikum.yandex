import BaseBlock from "src/common/base-block";
import {Renderer} from "./renderer";

class Route {
    private _pathname: string;
    private readonly _renderer;
    private readonly _blockCtor: typeof BaseBlock;
    private _block: BaseBlock | null;

    constructor (pathname: string, blockCtor: typeof BaseBlock, renderer: Renderer) {
        this._pathname = pathname;
        this._blockCtor = blockCtor;
        this._block = null;
        this._renderer = renderer;
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
        return pathname === this._pathname;
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

export default Route;