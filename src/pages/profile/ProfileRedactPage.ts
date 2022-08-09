import BaseBlock from "../../common/base-block";
import './style.less';
import template from './redact-template.hbs';
import {Profile} from "../../data/profile";
import Button from "../../components/button";
import ProfileInfoItem from "../../components/profile-info-item";
import Form from "../../components/form";

class ProfileRedactPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }
    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }
    public static create (profile: Profile) {
        return new ProfileRedactPage({
            action: '#profile',
            title: profile.display_name,
            form: new Form({
                class: 'profile-form',
                fields: [
                    new ProfileInfoItem({
                        input: true,
                        name:"email",
                        label:"Почта",
                        value: profile.email,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name:"login",
                        label:"Логин",
                        value: profile.login,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name:"first_name",
                        label:"Имя",
                        value: profile.first_name,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name:"second_name",
                        label:"Фамилия",
                        value: profile.second_name,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name:"display_name",
                        label:"Имя в чате",
                        value: profile.display_name,
                    }),
                    new ProfileInfoItem({
                        input: true,
                        name:"phone",
                        label:"Телефон",
                        value: profile.phone,
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

export default ProfileRedactPage;