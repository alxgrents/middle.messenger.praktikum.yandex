import BaseBlock from '../../common/base-block';
import './style.less';
import template from './info-template.hbs';
import ProfileInfoItem from '../../components/profile-info-item';
import { Profile } from '../../data/profile';
import Link from '../../components/link';

class ProfileInfoPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }

    public static create(profile: Profile) {
        return new ProfileInfoPage({
            title: profile.display_name,
            profile,
            fields: [
                new ProfileInfoItem({ label: 'Почта', value: profile.email }),
                new ProfileInfoItem({ label: 'Логин', value: profile.login }),
                new ProfileInfoItem({ label: 'Имя', value: profile.first_name }),
                new ProfileInfoItem({ label: 'Фамилия', value: profile.second_name }),
                new ProfileInfoItem({ label: 'Имя в чате', value: profile.display_name }),
                new ProfileInfoItem({ label: 'Телефон', value: profile.phone }),
            ],
            links: [
                new Link({
                    href: '#profile-redact',
                    text: 'Изменить данные',
                    class: 'profile-link profile-redact-link',
                }),
                new Link({
                    href: '#profile-change-password',
                    text: 'Изменить пароль',
                    class: 'profile-link',
                }),
                new Link({
                    href: '#authorization',
                    text: 'Выйти',
                    class: 'profile-link profile-exit-link',
                }),
            ],
        });
    }
}

export default ProfileInfoPage;
