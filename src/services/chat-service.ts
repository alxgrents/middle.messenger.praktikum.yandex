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

    public create () {
        return Api.getInstance().post(BASE_URL);
    }

    public getAll () {
        return Api.getInstance().get(BASE_URL);
    }
}