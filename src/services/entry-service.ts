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

    async signUp(data: SignUpData): Promise<boolean> {
        try {
            await Api.getInstance().post(`${BASE_URL}/signup`, {
                headers: {
                    'content-type': 'application/json',
                },
                data,
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async signIn (data: SignInData): Promise<boolean> {
        try {
            await Api.getInstance().post(`${BASE_URL}/signin`, {
                headers: {
                    'content-type': 'application/json',
                },
                data,
            });

            return true;
        }
        catch (e) {
            return false;
        }
    }

    async logOut () {
        return Api.getInstance().post(`${BASE_URL}/logout`);
    }
}