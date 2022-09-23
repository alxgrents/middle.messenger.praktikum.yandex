import {Form, FormOptions} from "../form";
import './style.less';
const template = require('./template.hbs');

export class SendMessageForm extends Form {
    constructor(options: FormOptions = {}) {
        super(options);
        this.update({
            class: 'send-message-form',
        });
        //@ts-ignore
        window['sendMessageForm'] = this;
    }

    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }
}