import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import ChatNavItem from '../../components/chat-nav-item';
import Message from '../../components/message';
import { ChatData } from '../../data/chats';
import { MessageData } from '../../data/messages';

class ChatPage extends BaseBlock {
    protected render(): string | DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount() {
        this._props.class = 'chat-container';
    }

    public static create(props: Record<string, any>) {
        const {
            chats = [],
            messages = [],
            currentChat,
        } = props;

        return new ChatPage({
            chats: chats.map((chat: ChatData) => new ChatNavItem({ chat })),
            messages: messages.map((message: MessageData) => new Message({ message })),
            currentChat,
        });
    }
}

export default ChatPage;
