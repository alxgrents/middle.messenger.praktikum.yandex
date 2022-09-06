import {SWAGGER_API_HOST} from "./swagger-api-host";
import Api from "../helpers/api";
import EventEmitter from "../helpers/event-emitter";

const BASE_URL = `${SWAGGER_API_HOST}/api/v2/chats/token`;
const BASE_SOCKET_URL = 'wss://ya-praktikum.tech/ws/chats';

type connectData = {
    userId: number,
    chatId: number,
};

export class MessageService {
    private static __instance?: MessageService;
    private constructor() {};
    private _sockets = new Map<number,WebSocket>();
    private _events = new EventEmitter();

    public static getInstance (): MessageService {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    public async connect ({
        userId,
        chatId,
    }: connectData): Promise<void> {
        let socket = this._sockets.get(chatId);
        if (socket) {
            return;
        }

        const { token } = await Api.getInstance().post(`${BASE_URL}/${chatId}`, {
            withCredentials: true,
        });
        socket = new WebSocket(`${BASE_SOCKET_URL}/${userId}/${chatId}/${token}`);
        this._initSocket(chatId, socket);
        this._sockets.set(chatId, socket);
    }

    private _initSocket (chatId: number, socket: WebSocket) {
        socket.addEventListener('close', () => this._events.emit('close', {
            chatId,
        }));

        socket.addEventListener('message', (event) => this._events.emit('message', {
            chatId,
            message: event.data,
        }));

        socket.addEventListener('error', () => this._events.emit('error', {
            chatId,
        }));
    }
}