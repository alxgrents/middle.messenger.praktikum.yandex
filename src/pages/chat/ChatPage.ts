import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import ChatNavItem from '../../components/chat-nav-item';
import Message from '../../components/message';

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
            currentChat = undefined,
            messages = [],
        } = props;

        return new ChatPage({
            chats: chats.map((chat: any) => new ChatNavItem({ chat })),
            currentChat,
            messages: messages.map((message: any) => new Message({ message })),
        });
    }
}

export default ChatPage;
