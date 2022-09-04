import {
    ChatData,
    MessageData,
    ProfileData,
    CHATS,
    MESSAGES,
    PROFILE,
} from "../data";
import {createProxy} from "../utils/create-proxy";
import EventEmitter from "./event-emitter";

type ContextFields = 'chats'
    | 'messages'
    | 'isAuth'
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
        this.chats = createProxy(CHATS, {
            onUpdate: () => this.events.emit('chats', this.chats),
        });
        this.messages = createProxy(MESSAGES, {
            onUpdate: () => this.events.emit('messages', this.chats),
        });
        this.profile = createProxy(PROFILE, {
            onUpdate: () => this.events.emit('profile', this.chats),
        });
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
}