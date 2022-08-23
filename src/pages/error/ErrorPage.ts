import BaseBlock from '../../common/base-block';
import template from './template.hbs';
import './style.less';

class ErrorPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'error-container';
    }
}

export default ErrorPage;
