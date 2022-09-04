import {
    describe,
    before,
    it,
} from 'mocha'
import {expect} from 'chai';
import { JSDOM } from 'jsdom';
import * as Handlebars from 'handlebars';
import BaseBlock from "..//base-block";
import {BaseBlockOptions} from "../types";

function createTestBlock (): {
    block: BaseBlock,
    className: string,
    content: string,
} {
    const template = Handlebars.compile('<div>{{content}}</div>');
    class TestBlock extends BaseBlock {
        constructor(options: BaseBlockOptions = {}) {
            super(options);
        }

        protected render(): string | DocumentFragment {
            return template(this._props);
        }
    }

    const content = 'test';
    const className = 'test-class';
    const block = new TestBlock({
        content,
        class: className,
    });

    return {
        block,
        className,
        content,
    };
}

describe('BaseBlock', () => {
    before(() => {
        const dom = new JSDOM('<!doctype html><html><body></body></html>', {
            url: 'http://localhost:3000',
        });

        // @ts-ignore
        global.window = dom.window;
        //@ts-ignore
        global.document = global.window.document;
    });
    it('Компонент компилится корректно', () => {
        const {
            block,
            className,
            content,
        } = createTestBlock();

        expect(block.getContent().className).to.eq(className);
        expect(block.getContent().textContent).to.eq(content);
    });
    it('Компонент ререндерится после изменения свойств ', function () {
        const {
            block,
            content,
        } = createTestBlock();
        const newContent = content + 'some info';

        expect(block.getContent().textContent).to.eq(content);
        expect(block.getContent().textContent).to.not.eq(newContent);
        block.update({
            content: newContent,
        });
        expect(block.getContent().textContent).to.not.eq(content);
        expect(block.getContent().textContent).to.eq(newContent);
    });
});