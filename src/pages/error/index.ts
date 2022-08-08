import template from './template.hbs'
import './style.less';
import BaseBlock from "../../common/base-block";

export class ErrorPage extends BaseBlock {
    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'error-container';
    }
}

/**
 * @param {Object} [props]
 * @returns {string}
 */
export const notFoundError = (props = {}) => template(Object.assign({
    message: 'Не туда попали',
    errorCode: '404',
}, props));
/**
 * @param {Object} [props]
 * @returns {string}
 */
export const serverError = (props = {}) => template(Object.assign({
    message: 'Мы уже фиксим',
    errorCode: '500',
}, props));