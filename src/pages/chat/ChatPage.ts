import BaseBlock from '../../common/base-block';
import './style.less';
import template from './template.hbs';
import ChatNavItem from '../../components/chat-nav-item';
import Message from '../../components/message';
import { ChatData } from '../../data/chats';
import { MessageData } from '../../data/messages';
import {Context} from "../../helpers/context";
import Link from "../../components/link";
import Form from "../../components/form";
import Button from "../../components/button";
import {ChatService} from "../../services";
import {Router} from '../../helpers/router';
import {BaseBlockOptions} from "../../common/types";

class ChatPage extends BaseBlock {
    constructor (options = {}) {
        super(options);
        this.update({
            profileLink: new Link({
                href: 'settings',
                text: 'Профиль',
                class: 'profile-link',
            }),
            createChat: new Form({
                class: 'create-chat-form',
                submitButton: new Button({
                    text: 'Создать чат',
                    class: 'submit-button create-chat-button',
                }),
                onSubmit: () => {
                    ChatService.getInstance().create('Диалог')
                        .then(() => Context.getInstance().updateChats())
                        .catch(() => Router.getInstance().go('error-500'));

                },
            }),
            chatsData: Context.getInstance().chats,
            messages: Context.getInstance().messages.map((message: MessageData) => new Message({ message })),
            currentChat: Context.getInstance().currentChat,
        });
    }

    update(options: BaseBlockOptions = {}) {
        if (options.chatsData) {
            Object.assign(options, {
                chats: Context.getInstance().chats.map((chat: ChatData) => new ChatNavItem({ chat })),
            });
        }
        super.update(options);
    }

    protected render(): string | DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount() {
        this._props.class = 'chat-container';
    }
}

export default ChatPage;
