import BaseBlock from '../../common/base-block';
import './style.less';
import template from './password-change-template.hbs';
import { Profile } from '../../data/profile';
import Button from '../../components/button';
import ProfileInfoItem from '../../components/profile-info-item';
import Form from '../../components/form';

class ProfileChangePasswordPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }

    public static create(profile: Profile) {
        return new ProfileChangePasswordPage({
            action: '#profile',
            title: profile.display_name,
            form: new Form({
                class: 'profile-form',
                fields: [
                    new ProfileInfoItem({
                        input: true,
                        name: 'oldPassword',
                        label: 'Старый пароль',
                        value: profile.password,
                        type: 'password',
                        placeholder: 'Пароль',
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'newPassword',
                        label: 'Новый пароль',
                        type: 'password',
                        placeholder: 'Пароль',
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'newPasswordRetry',
                        label: 'Повторите новый пароль',
                        type: 'password',
                        placeholder: 'Пароль',
                    }),
                ],
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
