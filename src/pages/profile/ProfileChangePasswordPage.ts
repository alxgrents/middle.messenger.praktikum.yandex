import BaseBlock from '../../common/base-block';
import './style.less';
import template from './password-change-template.hbs';
import { Profile } from '../../data/profile';
import Button from '../../components/button';
import ProfileInfoItem from '../../components/profile-info-item';
import Form from '../../components/form';
import Validator from '../../helpers/validator';

class ProfileChangePasswordPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }

    public static create(profile: Profile) {
        return new ProfileChangePasswordPage({
            title: profile.display_name,
            form: new Form({
                action: 'profile',
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
            }),
        });
    }
}

export default ProfileChangePasswordPage;
