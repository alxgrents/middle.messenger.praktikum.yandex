import BaseBlock from '../../common/base-block';
import './style.less';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import Link from '../../components/link';
import {Form} from '../../components/form';
import Validator from '../../helpers/validator';
import {EntryService} from "../../services";
import {Router} from "../../helpers/router";
import {Context} from "../../helpers/context";
const template = require('./registration-template.hbs');

class RegistrationPage extends BaseBlock {
    constructor(options = {}) {
        super(Object.assign({
            title: 'Регистрация',
            form: new Form({
                action: 'chat',
                fields: [
                    new InputField({
                        name: 'email',
                        label: 'Почта',
                    }),
                    new InputField({
                        name: 'login',
                        label: 'Логин',
                    }),
                    new InputField({
                        name: 'first_name',
                        label: 'Имя',
                    }),
                    new InputField({
                        name: 'second_name',
                        label: 'Фамилия',
                    }),
                    new InputField({
                        name: 'phone',
                        label: 'Телефон',
                    }),
                    new InputField({
                        name: 'password',
                        label: 'Пароль',
                        type: 'password',
                    }),
                    new InputField({
                        name: 'password_retry',
                        label: 'Пароль (ещё раз)',
                        type: 'password',
                    }),
                ],
                validators: {
                    email: Validator.create(['email']),
                    first_name: Validator.create(['name']),
                    second_name: Validator.create(['name']),
                    login: Validator.create([
                        'enCharsAndDigits',
                        'containChar',
                        { type: 'min', value: 3 },
                        { type: 'max', value: 20 },
                    ]),
                    phone: Validator.create([
                        'phone',
                        { type: 'min', value: 10 },
                        { type: 'max', value: 15 },
                    ]),
                    password: Validator.create([
                        'containDigit',
                        'containCapitalChar',
                        { type: 'min', value: 8 },
                        { type: 'max', value: 40 },
                    ]),
                    password_retry: Validator.create([
                        'containDigit',
                        'containCapitalChar',
                        { type: 'min', value: 8 },
                        { type: 'max', value: 40 },
                    ]),
                },
                submitButton: new Button({
                    text: 'Зарегистрироваться',
                    class: 'submit-button',
                }),
                onSubmit: async (data) => {
                    EntryService.getInstance().signUp({
                        login: data.login,
                        password: data.password,
                        email: data.email,
                        first_name: data.first_name,
                        second_name: data.second_name,
                        phone: data.phone,
                    })
                        .then(() => Context.getInstance().isAuth = true)
                        .then(() => Router.getInstance().go('messenger'))
                        .catch(() => Router.getInstance().go('error-500'))
                },
            }),
            toAuthorization: new Link({
                href: 'sign-in',
                text: 'Войти',
                class: 'authorization-link',
            }),
        }, options));

    }

    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'entry-container registration';
    }
}

export default RegistrationPage;
