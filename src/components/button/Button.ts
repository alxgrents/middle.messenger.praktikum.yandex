import template from './template.hbs';
import './style.less';
import BaseBlock from "../../common/base-block";

class Button extends BaseBlock {
    constructor (props: any = {}) {
        super(props, 'button');
    }

    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = this._props.class + ' base-button';
    }
}

export default Button;