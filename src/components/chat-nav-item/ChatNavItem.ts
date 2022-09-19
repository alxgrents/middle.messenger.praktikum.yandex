import BaseBlock from '../../common/base-block';
import './style.less';
import {Context} from "../../helpers/context";
import {BaseBlockOptions, BaseBlockProps} from "../../common/types";
import {ChatData} from "../../data";
const template = require('./template.hbs');

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
            class: `chat-nav-item ${options.chat.selected ? 'chat-nav-item-selected' : ''}`,
            events: {
                click: () => Context.getInstance().selectChat(this._props.chat)
            },
        });
    }
    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    update(options: BaseBlockOptions = {}): void {
        if (options.chat) {
            Object.assign(options, {
                class: `chat-nav-item ${options.chat.selected ? 'chat-nav-item-selected' : ''}`
            });
        }
        super.update(options);
    }
}

export default ChatNavItem;
