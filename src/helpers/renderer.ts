import BaseBlock from '../common/base-block';

export type RenderData = string | HTMLElement | BaseBlock;

function getRoot (rootSelector: string): HTMLElement {
    const root = document.querySelector(rootSelector);

    if (root instanceof HTMLElement) {
        return root;
    }
    throw new Error('Root element not found!');
}

export class Renderer {
    private readonly _root: HTMLElement;
    private readonly _blocks = new Set<BaseBlock>();
    private _activeBlock?: BaseBlock;

    constructor() {
        this._root = getRoot('#root');

        // Чтобы можно было передавать метод в качестве callback-a
        this.render = this.render.bind(this);
    }

    render (data: RenderData) {
        if (this._activeBlock) {
            this._activeBlock.hide();
        }
        else {
            this._root.innerHTML = '';
        }
        if (data instanceof BaseBlock) {
            if (this._blocks.has(data)) {
                data.show();
            }
            else {
                this._blocks.add(data);
                this._root.appendChild(data.getContent());
            }

            this._activeBlock = data;
        } else if (data instanceof HTMLElement) {
            this._root.appendChild(data);
            this._activeBlock = undefined;
        } else {
            // todo убрать этот страшный метод
            this._activeBlock = undefined;
            this._root.innerHTML = data;
        }
    }
}
