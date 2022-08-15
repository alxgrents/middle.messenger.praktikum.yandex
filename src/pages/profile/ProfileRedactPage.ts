import BaseBlock from '../../common/base-block';
import './style.less';
import template from './redact-template.hbs';
import { Profile } from '../../data/profile';
import Button from '../../components/button';
import ProfileInfoItem from '../../components/profile-info-item';
import Form from '../../components/form';
import Validator from '../../helpers/validator';

class ProfileRedactPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }

    public static create(profile: Profile) {
        return new ProfileRedactPage({
            title: profile.display_name,
            form: new Form({
                class: 'profile-form',
                action: 'profile',
                fields: [
                    new ProfileInfoItem({
                        input: true,
                        name: 'email',
                        label: 'Почта',
                        value: profile.email,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'login',
                        label: 'Логин',
                        value: profile.login,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'first_name',
                        label: 'Имя',
                        value: profile.first_name,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'second_name',
                        label: 'Фамилия',
                        value: profile.second_name,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'display_name',
                        label: 'Имя в чате',
                        value: profile.display_name,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name: 'phone',
                        label: 'Телефон',
                        value: profile.phone,
                    }),
                ],
                validators: {
                    email: Validator.create(['email']),
                    first_name: Validator.create(['name']),
                    second_name: Validator.create(['name']),
                    display_name: Validator.create(['noEmpty', 'charAndDigits']),
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

export default ProfileRedactPage;
