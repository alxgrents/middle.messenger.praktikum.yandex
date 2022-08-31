import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import ChatNavItem from '../../components/chat-nav-item';
import Message from '../../components/message';
import { ChatData } from '../../data/chats';
import { MessageData } from '../../data/messages';
import {Context} from "../../helpers/context";
import Link from "../../components/link";

class ChatPage extends BaseBlock {
    constructor (options = {}) {
        const chats = Context.getInstance().chats;
        const messages = Context.getInstance().messages;
        const currentChat = Context.getInstance().currentChat;

        super(Object.assign({
            profileLink: new Link({
                href: 'settings',
                text: 'Профиль',
                class: 'profile-link',
            }),
            chats: chats.map((chat: ChatData) => new ChatNavItem({ chat })),
            messages: messages.map((message: MessageData) => new Message({ message })),
            currentChat,
        }, options));
    }

    protected render(): string | DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount() {
        this._props.class = 'chat-container';
    }
}

export default ChatPage;
