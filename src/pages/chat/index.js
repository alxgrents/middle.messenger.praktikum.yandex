import template from './template.hbs'
import './style.less';

/**
 * @param {{
 *     chats: Chat[],
 *     messages: Message[],
 *     currentChat?: Chat,
 * }} props
 */
export default (props = {}) => template(props);