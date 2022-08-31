import BaseBlock from '../../common/base-block';
import template from './authorization-template.hbs';
import './style.less';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import Link from '../../components/link';
import Form from '../../components/form';
import Validator from "../../helpers/validator";
import {BaseBlockOptions} from "../../common/types";
import {EntryService} from "../../services/entry-service";
import Router from "../../helpers/router";

class AuthorizationPage extends BaseBlock {
    constructor (options: BaseBlockOptions = {}) {
        super(Object.assign({
            title: 'Вход',
            form: new Form({
                action: 'messenger',
                fields: [
                    new InputField({
                        name: 'login',
                        label: 'Логин',
                    }),
                    new InputField({
                        name: 'password',
                        label: 'Пароль',
                        type: 'password',
                    }),
                ],
                validators: {
                    login: Validator.create([
                        'enCharsAndDigits',
                        'containChar',
                        { type: 'min', value: 3 },
                        { type: 'max', value: 20 },
                    ]),
                    password: Validator.create([
                        'containDigit',
                        'containCapitalChar',
                        { type: 'min', value: 8 },
                        { type: 'max', value: 40 },
                    ]),
                },
                submitButton: new Button({
                    text: 'Авторизация',
                    class: 'submit-button',
                }),
                onSubmit: async (data) => {
                    const result = await EntryService.getInstance().signIn({
                        login: data.login,
                        password: data.password,
                    });

                    if (result) {
                        Router.getInstance().go('messenger');
                    }
                },
            }),
            toRegistration: new Link({
                href: 'sign-up',
                text: 'Нет аккаунта?',
                class: 'registration-link',
            }),
        }, options));
    }

    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'entry-container authorization';
    }
}

export default AuthorizationPage;
