import infoTemplate from './info-template.hbs'
import redactTemplate from './redact-template.hbs';
import changePasswordTemplate from './password-change-template.hbs';
import './style.less';

/**
 * @param {Object} [props]
 * @returns {string}
 */
export const profileInfo = (props = {}) => infoTemplate(props);
/**
 * @param {Object} [props]
 * @returns {string}
 */
export const profileRedact = (props = {}) => redactTemplate(props);
/**
 * @param {Object} [props]
 * @returns {string}
 */
export const profileChangePassword = (props = {}) => changePasswordTemplate(props);