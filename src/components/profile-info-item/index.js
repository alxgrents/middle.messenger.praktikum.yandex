import Handlebars from 'handlebars';
import staticTemplate from './static-item-template.hbs';
import inputTemplate from './input-item-template.hbs';
import './style.less';

Handlebars.registerPartial('profile-info-item-static', staticTemplate);
Handlebars.registerPartial('profile-info-item-input', inputTemplate);

export const profileInfoItemStatic = (props = {}) => staticTemplate(props);
export const profileInfoItemInput = (props = {}) => inputTemplate(props);