import BaseBlock from "../../common/base-block";
import './style.less';
import template from "./template.hbs";

class Link extends BaseBlock {
    constructor (props: any = {}) {
        super(props, 'a');
    }

    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = this._props.class + ' base-link';
    }
}

export default Link;