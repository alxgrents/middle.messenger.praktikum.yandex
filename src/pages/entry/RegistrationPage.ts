import BaseBlock from '../../common/base-block';
import template from './registration-template.hbs';
import './style.less';
import InputField from '../../components/input-field';
import Button from '../../components/button';
import Link from '../../components/link';

class RegistrationPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'entry-container registration';
    }

    public static create() {
        return new RegistrationPage({
            title: 'Регистрация',
            email: new InputField({
                name: 'email',
                label: 'Почта',
            }),
            login: new InputField({
                name: 'login',
                label: 'Логин',
            }),
            first_name: new InputField({
                name: 'first_name',
                label: 'Имя',
            }),
            second_name: new InputField({
                name: 'second_name',
                label: 'Фамилия',
            }),
            phone: new InputField({
                name: 'phone',
                label: 'Телефон',
            }),
            password: new InputField({
                name: 'password',
                label: 'Пароль',
                type: 'password',
            }),
            password_repeat: new InputField({
                name: 'password',
                label: 'Пароль (ещё раз)',
                type: 'password',
            }),
            button: new Button({
                text: 'Зарегистрироваться',
                class: 'submit-button',
            }),
            toAuthorization: new Link({
                href: '#authorization',
                text: 'Войти',
                class: 'authorization-link',
            }),
        });
    }
}

export default RegistrationPage;
