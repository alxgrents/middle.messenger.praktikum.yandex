import BaseBlock from '../../common/base-block';
import './style.less';
import ChatNavItem from '../../components/chat-nav-item';
import Message from '../../components/message';
import { MessageData, ChatData } from '../../data';
import {Context} from "../../helpers/context";
import Link from "../../components/link";
import {Form} from "../../components/form";
import Button from "../../components/button";
import {ChatService, MessageService} from "../../services";
import {Router} from '../../helpers/router';
import {BaseBlockOptions} from "../../common/types";
import { SendMessageForm } from '../../components/send-message-form';
import Validator from '../../helpers/validator';
const template = require('./template.hbs');

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
            sendMessage: new SendMessageForm({
                cleanup: true,
                validators: {
                    message: Validator.create([
                        { type: 'min', value: 1 }
                    ])
                },
                onSubmit: (data) => {
                    console.log('SendMessageForm', data);
                    MessageService.getInstance().send({
                        text: data.message,
                    });
                },
            }),
            chatsData: Context.getInstance().chats,
            messagesData: Context.getInstance().messages,
            currentChat: Context.getInstance().currentChat,
        });
    }

    update(options: BaseBlockOptions = {}) {
        if (options.chatsData) {
            Object.assign(options, {
                chats: options.chatsData.map((chat: ChatData) => new ChatNavItem({ chat })),
            });
        }
        if (options.messagesData) {
            Object.assign(options, {
                messages: options.messagesData.map((message: MessageData) => new Message({ message })),
            });
        }
        super.update(options);
    }

    protected render(): string | DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount() {
        this._props.class = 'chat-container';

        Context.getInstance().on(['chats'], () => this.update({
            chatsData: Context.getInstance().chats,
            currentChat: Context.getInstance().currentChat,
        }));
        Context.getInstance().on(['messages'], () => this.update({
            messagesData: Context.getInstance().messages,
        }));
        Context.getInstance().on(['currentChat'], () => {
            this.update({
                chatsData: Context.getInstance().chats,
                currentChat: Context.getInstance().currentChat,
            });
            const currentChat = Context.getInstance().currentChat;
            if (currentChat) {
                MessageService.getInstance().connect({
                    chatId: currentChat.id,
                    userId: Context.getInstance().profile.id,
                })
                    .then((...args) => console.error('then', ...args))
                    .catch((...args) => console.error('catch', ...args));
            }
        });
    }
}

export default ChatPage;
