import template from './template.hbs'
import './style.less';

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