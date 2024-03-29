import Api from "../helpers/api";
import {SWAGGER_API_HOST} from "./swagger-api-host";

type SignInData = {
    login: string,
    password: string,
}

type SignUpData = {
    login: string,
    password: string,
    first_name: string,
    second_name: string,
    email: string,
    phone: string,
}

const BASE_URL = `${SWAGGER_API_HOST}/api/v2/auth`;

export class EntryService {
    private static __instance?: EntryService;
    private constructor() {};

    public static getInstance (): EntryService {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    async signUp(data: SignUpData): Promise<any> {
        return Api.getInstance().post(`${BASE_URL}/signup`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data,
        });
    }

    async signIn (data: SignInData): Promise<any> {
        return Api.getInstance().post(`${BASE_URL}/signin`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            data,
        });
    }

    async logOut (): Promise<any> {
        return Api.getInstance().post(`${BASE_URL}/logout`, {
            withCredentials: true,
        });
    }

    async getInfo (): Promise<any> {
        return Api.getInstance().get(`${BASE_URL}/user`, {
            withCredentials: true,
        });
    }
}