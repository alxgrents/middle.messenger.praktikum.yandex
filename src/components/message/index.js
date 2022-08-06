import Handlebars from 'handlebars';
import template from './template.hbs';
import './style.less';

Handlebars.registerPartial('message', template);

export default (props = {}) => template(props);