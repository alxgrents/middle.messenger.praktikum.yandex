import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';

class InputField extends BaseBlock {
    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        if (!this._props.class) {
            this._props.class = 'input-field';
        }
    }
}

export default InputField;
