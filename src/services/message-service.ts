import {SWAGGER_API_HOST} from "./swagger-api-host";
import Api from "../helpers/api";
import EventEmitter from "../helpers/event-emitter";
import {MessageData} from "../data";

const BASE_URL = `${SWAGGER_API_HOST}/api/v2/chats/token`;
const BASE_SOCKET_URL = 'wss://ya-praktikum.tech/ws/chats';

type connectData = {
    userId: number,
    chatId: number,
};

type NewMessageCallback = (message: MessageData) => any;

export class MessageService {
    private static __instance?: MessageService;
    private constructor() {};
    private _sockets = new Map<number,WebSocket>();
    private _events = new EventEmitter();
    private _socket?: WebSocket;
    private _newMessageCallback?: NewMessageCallback;

    public static getInstance (): MessageService {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    public onNewMessage (callback: NewMessageCallback): void {
        if (!this._newMessageCallback) {
            this._newMessageCallback = callback;
        }
    }

    public async connect ({
        userId,
        chatId,
    }: connectData): Promise<void> {
        let socket = this._sockets.get(chatId);
        if (socket) {
            this._socket = socket;
            this.load();

            return;
        }

        const { token } = await Api.getInstance().post(`${BASE_URL}/${chatId}`, {
            withCredentials: true,
        });
        socket = new WebSocket(`${BASE_SOCKET_URL}/${userId}/${chatId}/${token}`);
        if (!socket) {
            throw new Error('Error create WebSocket');
        }
        this._initSocket(chatId, socket);
        this._sockets.set(chatId, socket);
        this._socket = socket;

        await new Promise(resolve => socket && socket.addEventListener('open', resolve));

        this.load();
    }

    load () {
        if (this._socket) {
            this._socket.send(JSON.stringify({
                content: "20",
                type: "get old"
            }));
        }
    }

    send (data: Partial<MessageData>) {
        if (this._socket) {
            this._socket.send(JSON.stringify({
                content: data,
                type: 'message',
            }));
        }
    }

    private _initSocket (chatId: number, socket: WebSocket) {
        socket.addEventListener('close', () => {
            this._sockets.delete(chatId);
        });

        socket.addEventListener('message', (event) => {
            if (this._newMessageCallback) {
                const result = JSON.parse(event.data);
                if (result.type === 'message') {
                    this._newMessageCallback(result.content);
                }
            }
        });

        socket.addEventListener('error', () => this._events.emit('error', {
            chatId,
        }));
    }
}