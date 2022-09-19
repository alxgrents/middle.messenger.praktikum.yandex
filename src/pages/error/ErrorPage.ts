import BaseBlock from '../../common/base-block';
import './style.less';
const template = require('./template.hbs');

class ErrorPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'error-container';
    }
}

export default ErrorPage;
