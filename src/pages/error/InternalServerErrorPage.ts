import ErrorPage from "./ErrorPage";
import {BaseBlockOptions} from "../../common/types";
import Link from "../../components/link";

class InternalServerErrorPage extends ErrorPage {
    constructor (options: BaseBlockOptions = {}) {
        super(Object.assign({
            message: 'Мы уже фиксим',
            errorCode: '500',
            link: new Link({
                class: 'to-home-link',
                href: '#chat',
                text: 'Назад к чатам',
            }),
        }, options));
    }
}

export default InternalServerErrorPage;