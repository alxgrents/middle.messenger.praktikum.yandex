import BaseBlock from '../../common/base-block';
import template from './template.hbs';
import './style.less';
import Link from '../../components/link';

class ErrorPage extends BaseBlock {
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'error-container';
    }

    public static createNotFoundPage() {
        return new ErrorPage({
            message: 'Не туда попали',
            errorCode: '404',
            link: new Link({
                class: 'to-home-link',
                href: '#chat',
                text: 'Назад к чатам',
            }),
        });
    }

    public static createServerErrorPage() {
        return new ErrorPage({
            message: 'Мы уже фиксим',
            errorCode: '500',
            link: new Link({
                class: 'to-home-link',
                href: '#chat',
                text: 'Назад к чатам',
            }),
        });
    }
}

export default ErrorPage;
