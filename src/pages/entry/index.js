import authTemplate from './authorization-template.hbs';
import registrationTemplate from './registration-template.hbs';
import './style.less';

/**
 * @param {Object} [props]
 * @returns {string}
 */
export const authorization = (props = {}) => authTemplate(props)
/**
 * @param {Object} [props]
 * @returns {string}
 */
export const registration = (props = {}) => registrationTemplate(props)