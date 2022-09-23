import {
    describe,
    beforeEach,
    it,
} from 'mocha'
import {expect} from 'chai';
import { JSDOM } from 'jsdom';
import BaseBlock from "../../common/base-block";
import * as Handlebars from "handlebars";
import {BaseBlockOptions} from "../../common/types";
import { Router } from '../router';

function createRouter (): {
    router: Router,
} {
    // Каждый раз возвращаем новый роутер
    delete Router['__instance'];
    const router = new Router();

    return {
        router,
    }
}

function createBlockCtor (): {
    getBlock: () => BaseBlock | undefined,
    BlockCtor: typeof BaseBlock,
} {
    const template = Handlebars.compile('<div>{{content}}</div>');
    let block: TestBlock | undefined = undefined;
    class TestBlock extends BaseBlock {
        constructor(options: BaseBlockOptions = {}) {
            if (block) {
                return block;
            }

            super(options);
            block = this;
        }

        protected render(): string | DocumentFragment {
            return template(this._props);
        }
    }

    return {
        BlockCtor: TestBlock,
        getBlock: () => block,
    };
}

describe('Router', () => {
    beforeEach(() => {
        const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
            url: 'http://localhost',
        });

        // @ts-ignore
        global.window = dom.window;
        // @ts-ignore
        global.HTMLElement = window.HTMLElement;
        //@ts-ignore
        global.document = global.window.document;
    });

    it('Роутер создаётся, но не рендерит ненужный блок', () => {
        const { router } = createRouter();
        const { BlockCtor, getBlock } = createBlockCtor()

        router
            .use('test', BlockCtor)
            .start();

        expect(getBlock()).to.undefined;
    });
    it('Роутер создаётся и перенаправляет на стартовую страницу', () => {
        const { router } = createRouter();
        const { BlockCtor, getBlock } = createBlockCtor()

        router
            .use('test', BlockCtor)
            .start('test');

        expect(getBlock()).to.not.undefined;
    });
    it('Роутер перемещается между страницами', () => {
        const { router } = createRouter();
        const { BlockCtor: BlockCtor1, getBlock: getBlock1 } = createBlockCtor()
        const { BlockCtor: BlockCtor2, getBlock: getBlock2 } = createBlockCtor()

        router
            .use('test1', BlockCtor1)
            .use('test2', BlockCtor2)
            .start();

        expect(getBlock1()).to.undefined;
        expect(getBlock2()).to.undefined;

        router.go('test1');
        expect(getBlock1()).to.not.undefined;
        expect(getBlock2()).to.undefined;

        router.go('test2');
        expect(getBlock1()).to.not.undefined;
        expect(getBlock2()).to.not.undefined;
        expect(getBlock1()?.getContent().style.display).to.eq('none');
        expect(getBlock2()?.getContent().style.display).to.not.eq('none');
    });
});