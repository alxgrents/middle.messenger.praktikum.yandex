import BaseBlock from '../../common/base-block';
import './style.less';
import template from './password-change-template.hbs';
import Button from '../../components/button';
import ProfileInfoItem from '../../components/profile-info-item';
import Form from '../../components/form';
import Validator from '../../helpers/validator';
import {BaseBlockOptions} from "../../common/types";
import {Context} from "../../helpers/context";
import {ProfileService} from "../../services";
import {Router} from "../../helpers/router";

class ProfileChangePasswordPage extends BaseBlock {
    constructor (options: BaseBlockOptions = {}) {
        const profile = Context.getInstance().profile;

        super(Object.assign({
            title: profile.display_name,
            form: new Form({
                class: 'profile-form',
                fields: [
                    new ProfileInfoItem({
                        input: true,
                        name: 'old_password',
                        label: 'Старый пароль',
                        value: profile.password,
                        type: 'password',
                        placeholder: 'Пароль',
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'new_password',
                        label: 'Новый пароль',
                        type: 'password',
                        placeholder: 'Пароль',
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'new_password_retry',
                        label: 'Повторите новый пароль',
                        type: 'password',
                        placeholder: 'Пароль',
                    }),
                ],
                validators: {
                    old_password: Validator.create([
                        'containDigit',
                        'containCapitalChar',
                        { type: 'min', value: 8 },
                        { type: 'max', value: 40 },
                    ]),
                    new_password: Validator.create([
                        'containDigit',
                        'containCapitalChar',
                        { type: 'min', value: 8 },
                        { type: 'max', value: 40 },
                    ]),
                    new_password_retry: Validator.create([
                        'containDigit',
                        'containCapitalChar',
                        { type: 'min', value: 8 },
                        { type: 'max', value: 40 },
                    ]),
                },
                submitButton: new Button({
                    text: 'Сохранить',
                    class: 'profile-submit-button',
                    type: 'submit',
                    name: 'submit',
                }),
                onSubmit: async (data) => {
                    if (data.new_password_retry !== data.new_password) {
                        return;
                    }

                    ProfileService.getInstance().changePassword({
                        newPassword: data.new_password,
                        oldPassword: data.old_password,
                    })
                        .then(() => Router.getInstance().go('settings'))
                        .catch(() => Router.getInstance().go('error-500'))
                },
            }),
        }, options));
    }

    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }
}

export default ProfileChangePasswordPage;
