import BaseBlock from '../../common/base-block';
import './style.less';
import ProfileInfoItem from '../../components/profile-info-item';
import Link from '../../components/link';
import {BaseBlockOptions} from "../../common/types";
import {Context} from "../../helpers/context";
import {EntryService} from "../../services";
import {Router} from "../../helpers/router";
const template = require('./info-template.hbs');

class ProfileInfoPage extends BaseBlock {
    constructor (options: BaseBlockOptions = {}) {
        const profile = Context.getInstance().profile;

        super(Object.assign({
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
                    href: 'settings-redact',
                    text: 'Изменить данные',
                    class: 'profile-link profile-redact-link',
                }),
                new Link({
                    href: 'settings-change-password',
                    text: 'Изменить пароль',
                    class: 'profile-link',
                }),
                new Link({
                    href: 'sign-in',
                    text: 'Выйти',
                    class: 'profile-link profile-exit-link',
                    events: {
                        click: () => {
                            EntryService.getInstance().logOut()
                                .then(() => Router.getInstance().go('sign-in'))
                                .catch(() => Router.getInstance().go('error-500'));
                        },
                    },
                }),
            ],
        }, options));
    }

    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-container';
    }
}

export default ProfileInfoPage;
