import Handlebars from 'handlebars';
import template from './template.hbs';
import './style.less';

Handlebars.registerPartial('chat-nav-item', template);

export default (props = {}) => template(props);