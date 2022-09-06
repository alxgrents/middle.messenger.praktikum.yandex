import {
    ChatData,
    MessageData,
    ProfileData,
} from "../data";
import {createProxy} from "../utils/create-proxy";
import EventEmitter from "./event-emitter";
import {ChatService, EntryService, MessageService} from "../services";

type ContextFields = 'chats'
    | 'messages'
    | 'isAuth'
    | 'currentChat'
    | 'profile';

type ContextChangeCallback = (options: {
    key: string,
    value: any,
}) => any;

export class Context implements Record<ContextFields, any> {
    private static __instance: Context;

    public readonly events: EventEmitter;

    public readonly chats: ChatData[];
    public readonly messages: MessageData[];
    public readonly profile: ProfileData;
    private _isAuth: boolean = false;

    public static getInstance () {
        if (!Context.__instance) {
            Context.__instance = new Context();
        }

        return Context.__instance;
    }

    private constructor () {
        this.events = new EventEmitter();
        this.chats = createProxy([], {
            onUpdate: () => this.events.emit('chats', this.chats),
        });
        this.messages = createProxy([], {
            onUpdate: () => this.events.emit('messages', this.chats),
        });
        this.profile = createProxy({}, {
            onUpdate: () => this.events.emit('profile', this.chats),
        }) as ProfileData;
    }

    public async init (): Promise<void> {
        await EntryService.getInstance().getInfo()
            .then(data => {
                Object.assign(this.profile, data);
                this.isAuth = true;
            })
            .catch(() => this.isAuth = false);

        await this.updateChats();
        MessageService.getInstance().onNewMessage((message => {
            this.messages.push(message);
        }));
    }

    public async updateChats () {
        await ChatService.getInstance().getAll()
            .then((chats) => this.chats.splice(0, this.chats.length, ...chats));
    }

    get isAuth () {
        return this._isAuth;
    }

    set isAuth (value) {
        if (this._isAuth !== value) {
            this._isAuth = value;
            this.events.emit('isAuth', value);
        }
    }

    public on (fields: ContextFields[], callback: ContextChangeCallback): void {
        fields.forEach(field => this.events.on(field, callback));
    }

    public off (fields: ContextFields[], callback: ContextChangeCallback): void {
        fields.forEach(field => this.events.off(field, callback));
    }

    get currentChat (): ChatData | undefined {
        return this.chats.find((chat) => chat.selected);
    }

    selectChat (selectedChat: ChatData): void {
        if (this.currentChat && this.currentChat.id === selectedChat.id) {
            return;
        }
        this.messages.splice(0);
        this.chats.forEach(chat => chat.selected = chat.id === selectedChat.id);
        this.events.emit('currentChat', selectedChat);
        this.events.emit('chats', this.chats);
    }
}