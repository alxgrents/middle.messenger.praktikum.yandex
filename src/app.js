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

/**
 * @class App
 */
export default class App {
    /**
     * @constructor
     * @param {string} rootSelector
     */
    constructor (rootSelector) {
        /**
         * @type {HTMLElement}
         * @private
         */
        this._root = document.querySelector(rootSelector);

        this._roures = this._initRoutes();
        this._currentRoute = '';
    }

    /**
     * @public
     */
    init () {
        this._render();
        window.addEventListener('hashchange', () => this._render());
    }

    /**
     * @returns Object<string, function()>
     * @private
     */
    _initRoutes () {
        return {
            'error-500': serverError,
            'error-404': notFoundError,
            'authorization': authorization,
            'registration': registration,
            'profile': () => profileInfo({profile: PROFILE}),
            'profile-redact': () => profileRedact({profile: PROFILE}),
            'profile-change-password': () => profileChangePassword({profile: PROFILE}),
            '': this._renderChat,
        }
    }

    _renderChat () {
        return chat({
            chats: CHATS,
            currentChat: CHATS.find(chat => chat.selected),
            messages: MESSAGES,
        })
    }

    _getCurrentRoute () {
        return window.location.hash.replace('#', '');
    }

    _getPageRender (route) {
        return this._roures[route] || notFoundError
    }

    /**
     * @private
     */
    _render () {
        this._root.innerHTML = this._getPageRender(this._getCurrentRoute())();
    }
}