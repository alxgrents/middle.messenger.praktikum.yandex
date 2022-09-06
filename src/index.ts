import App from './app';
import {Context} from "./helpers/context";

const app = new App();

Promise.resolve()
    .then(() => app.init())
    .then(() => app.run())

//@ts-ignore
window.app = app;
//@ts-ignore
window.getContext = () => Context.getInstance();