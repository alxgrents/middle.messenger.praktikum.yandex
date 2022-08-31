import './components';
import './styles/main.less';
import Router from './helpers/router';
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

export default class App {
    private readonly _router: Router;

    constructor() {
        this._router = new Router();
    }

    /**
     * @public
     */
    init () {
        this._router
            .use('error-500', InternalServerErrorPage)
            .use('error-404', NotFoundErrorPage)
            .use('sign-in', AuthorizationPage)
            .use('sign-up', RegistrationPage)
            .use('settings', ProfileInfoPage)
            .use('settings-redact', ProfileRedactPage)
            .use('settings-change-password', ProfileChangePasswordPage)
            .use('messenger', ChatPage);

        this._router.start();
    }
}
