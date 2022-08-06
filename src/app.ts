import './components';
import './styles/main.less';
import {
    authorization,
    registration,
} from './pages/entry';
import {
    notFoundError,
    serverError,
} from './pages/error';
import chat from './pages/chat';
import {
    profileChangePassword,
    profileInfo,
    profileRedact,
} from './pages/profile';
import CHATS from './data/chats';
import MESSAGES from "./data/messages";
import PROFILE from './data/profile';
import Router from "./helpers/router";
import BaseBlock from "./common/base-block";

export default class App {
    private readonly _root: HTMLElement;
    private readonly _router: Router;

    constructor (rootSelector: string) {
        this._root = document.querySelector(rootSelector);

        this._router = new Router({
            'error-500': serverError,
            'error-404': notFoundError,
            'authorization': authorization,
            'registration': registration,
            'profile': () => profileInfo({profile: PROFILE}),
            'profile-redact': () => profileRedact({profile: PROFILE}),
            'profile-change-password': () => profileChangePassword({profile: PROFILE}),
            '': () => chat({chats: CHATS, currentChat: CHATS.find(chat => chat.selected), messages: MESSAGES}),
            'baseBlock': () => '',
        }, this._rerender.bind(this), notFoundError);
    }
 
    _rerender (html: string | HTMLElement) {
        typeof html === 'string'
            ? (this._root.innerHTML = html)
            : this._root.appendChild(html);
    }

    /**
     * @public
     */
    init () {
        this._router.init();
    }
}