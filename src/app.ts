import './components';
import './styles/main.less';
import Router from './helpers/router';
import { Renderer } from './helpers/renderer';
import {
    InternalServerErrorPage,
    NotFoundErrorPage,
    AuthorizationPage,
    RegistrationPage,
    ProfileChangePasswordPage,
    ProfileInfoPage,
    ProfileRedactPage,
    ChatPage,
} from "./pages";

function getRoot(rootSelector: string): HTMLElement {
    const root = document.querySelector(rootSelector);

    if (root instanceof HTMLElement) {
        return root;
    }
    throw new Error('Root element not found!');
}

export default class App {
    private readonly _root: HTMLElement;

    private readonly _router: Router;

    constructor(rootSelector: string) {
        this._root = getRoot(rootSelector);
        const renderer = new Renderer(this._root);
        this._router = new Router(renderer);
    }

    /**
     * @public
     */
    init () {
        this._router
            .use('error-500', InternalServerErrorPage)
            .use('error-404', NotFoundErrorPage)
            .use('authorization', AuthorizationPage)
            .use('registration', RegistrationPage)
            .use('profile', ProfileInfoPage)
            .use('profile-redact', ProfileRedactPage)
            .use('profile-change-password', ProfileChangePasswordPage)
            .use('chat', ChatPage);

        this._router.go('chat');
    }
}
