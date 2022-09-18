import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import {BaseBlockOptions} from "../../common/types";
import {Router} from "../../helpers/router/router";

class Link extends BaseBlock {
    constructor(options: BaseBlockOptions = {}) {
        super(options, 'a');
    }

    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = `${this._props.class} base-link`;
        const link = this.getContent() as HTMLLinkElement;
        const router = Router.getInstance();

        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = this._props.href;
            if (href && router) {
                router.go(href);
            }
        })
    }
}

export default Link;
