import Handlebars from 'handlebars';
import template from './template.hbs';
import './style.less';

Handlebars.registerPartial('link', template);

export default (props = {}) => template(props);