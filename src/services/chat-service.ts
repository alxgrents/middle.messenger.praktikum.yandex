import {SWAGGER_API_HOST} from "./swagger-api-host";
import Api from "../helpers/api";

const BASE_URL = `${SWAGGER_API_HOST}/api/v2/chats`;

export class ChatService {
    private static __instance?: ChatService;
    private constructor() {}

    public static getInstance (): ChatService {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    public create (title: string) {
        return Api.getInstance().post(BASE_URL, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
            },
            data: {
                title,
            },
        });
    }

    public getAll () {
        return Api.getInstance().get(BASE_URL, {
            withCredentials: true,
        });
    }
}