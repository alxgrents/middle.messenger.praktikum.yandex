import Handlebars from 'handlebars';
import template from './template.hbs';
import './style.less';

Handlebars.registerPartial('button', template);

export default (props = {}) => template(props);