import './components';
import './styles/main.less';
import {Router} from './helpers/router/router';
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
import {Context} from "./helpers/context";

export default class App {
    private readonly _router: Router;

    constructor() {
        this._router = new Router();
    }

    private readonly _signInPathname = 'sign-in';
    private readonly _messengerPathname = 'messenger';

    async init () {
        this._router
            .use('error-500', InternalServerErrorPage)
            .use('error-404', NotFoundErrorPage)
            .use(this._signInPathname, AuthorizationPage, {
                authRedirect: this._messengerPathname,
            })
            .use('sign-up', RegistrationPage,{
                authRedirect: this._messengerPathname,
            })
            .use('settings', ProfileInfoPage, {
                notAuthRedirect: this._signInPathname,
            })
            .use('settings-redact', ProfileRedactPage, {
                notAuthRedirect: this._signInPathname,
            })
            .use('settings-change-password', ProfileChangePasswordPage, {
                notAuthRedirect: this._signInPathname,
            })
            .use(this._messengerPathname, ChatPage, {
                notAuthRedirect: this._signInPathname,
            });

        await Context.getInstance().init();
    }

    async run (): Promise<any> {
        const defaultPage = Context.getInstance().isAuth
            ? this._messengerPathname
            : this._signInPathname;
        this._router.start(defaultPage);
    }
}
