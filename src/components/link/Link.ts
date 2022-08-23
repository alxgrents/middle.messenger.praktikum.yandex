import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import {BaseBlockOptions} from "../../common/types";

class Link extends BaseBlock {
    constructor(options: BaseBlockOptions = {}) {
        super(options, 'a');
    }

    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = `${this._props.class} base-link`;
    }
}

export default Link;
