import BaseBlock from "../../common/base-block";
import template from "./authorization-template.hbs";
import './style.less';
import InputField from "../../components/input-field";
import Button from "../../components/button";
import Link from "../../components/link";

class AuthorizationPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'entry-container authorization';
    }

    public static create () {
        return new AuthorizationPage({
            title: "Вход",
            login: new InputField({
                name: "login",
                label: "Логин",
            }),
            password: new InputField({
                name: "password",
                label: "Пароль",
                type: "password",
            }),
            button: new Button({
                text: "Авторизация",
                class: "submit-button",
            }),
            toRegistration: new Link({
                href: "#registration",
                text: "Нет аккаунта?",
                class: "registration-link",
            }),
        });
    }
}

export default AuthorizationPage;