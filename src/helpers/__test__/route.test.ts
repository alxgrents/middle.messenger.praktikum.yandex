import {
    describe,
    before,
    it,
} from 'mocha'
import {expect} from 'chai';
import { JSDOM } from 'jsdom';
import BaseBlock from "../../common/base-block";
import Route from "../route";
import {Renderer} from "../renderer";
import * as Handlebars from "handlebars";
import {BaseBlockOptions} from "../../common/types";

function createRoute (): {
    pathname: string,
    route: Route,
    getBlock: () => BaseBlock | undefined,
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

    const renderer = new Renderer();
    const pathname = 'test';
    const route = new Route(pathname, TestBlock, renderer);

    return {
        pathname,
        route,
        getBlock: () => block,
    }
}

describe('Route', () => {
    before(() => {
        const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
            url: 'http://localhost',
        });

        // @ts-ignore
        global.window = dom.window;
        global.HTMLElement = window.HTMLElement;
        //@ts-ignore
        global.document = global.window.document;
    });

    it('Роут создаётся, блок не создаётся', function () {
        const {
            route,
            getBlock
        } = createRoute();

        expect(route).to.not.undefined;
        expect(getBlock()).to.undefined;
    });
    it('Роут проверяет переданный путь', function () {
        const {
            route,
            pathname,
        } = createRoute();

        expect(route.match(`/${pathname}`)).to.true;
        expect(route.match(`/${pathname}#test`)).to.true;
        expect(route.match(`/${pathname}?test=1`)).to.true;
        expect(route.match(`/${'some' + pathname}?test=1`)).to.false;
    });
    it('Роут рендерит блок только когда совпадает url', () => {
        const {
            route,
            pathname,
            getBlock,
        } = createRoute();

        expect(getBlock()).to.undefined;

        route.navigate(`/wrong${pathname}`);
        expect(getBlock()).to.undefined;

        route.navigate(`/${pathname}`);
        expect(getBlock()).to.not.undefined;
    });
    it('Роут скрывает элемент когда вызывается leave', () => {
        const {
            route,
            pathname,
            getBlock,
        } = createRoute();

        expect(getBlock()).to.undefined;

        route.navigate(`/${pathname}`);
        expect(getBlock()).to.not.undefined;
        expect(getBlock()?.getContent().style.display).to.not.eq('none');

        route.leave();
        expect(getBlock()).to.not.undefined;
        expect(getBlock()?.getContent().style.display).to.eq('none');
    })
})