import BaseBlock from '../common/base-block';

export type RenderData = string | HTMLElement | BaseBlock;

export class Renderer {
    private readonly _root: HTMLElement;

    constructor(root: HTMLElement) {
        this._root = root;

        // Чтобы можно было передавать метод в качестве callback-a
        this.render = this.render.bind(this);
    }

    render(data: RenderData) {
        this._root.innerHTML = '';
        if (data instanceof BaseBlock) {
            this._root.appendChild(data.getContent());
        } else if (data instanceof HTMLElement) {
            this._root.appendChild(data);
        } else {
            // todo убрать этот страшный метод
            this._root.innerHTML = data;
        }
    }
}
