import Handlebars from 'handlebars';
import template from './template.hbs';

Handlebars.registerPartial('link', template);

export default (props = {}) => template(props);