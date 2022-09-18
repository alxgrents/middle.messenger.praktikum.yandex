import App from './app';
import {Context} from "./helpers/context";
import {MessageService} from "./services";

const app = new App();

Promise.resolve()
    .then(() => app.init())
    .then(() => app.run())

//@ts-ignore
window.app = app;
//@ts-ignore
window.getContext = () => Context.getInstance();
//@ts-ignore
window.getMessageService = () => MessageService.getInstance();