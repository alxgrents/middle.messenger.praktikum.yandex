import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import {Context} from "../../helpers/context";
import {BaseBlockOptions, BaseBlockProps} from "../../common/types";
import {ChatData} from "../../data";

type ChatNavItemOptions  = BaseBlockOptions & {
    chat: ChatData;
}

class ChatNavItem extends BaseBlock {
    protected _props: BaseBlockProps & {
        chat: ChatData,
    }
    constructor(options: ChatNavItemOptions) {
        super(options);
        this.update({
            events: {
                click: () => Context.getInstance().selectChat(this._props.chat)
            },
        });
    }
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount(): void {
        this._props.class = `chat-nav-item ${this._props.selected ? 'chat-nav-item-selected' : ''}`;
    }
}

export default ChatNavItem;
