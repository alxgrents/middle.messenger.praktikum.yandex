import {SWAGGER_API_HOST} from "./swagger-api-host";
import Api from "../helpers/api";

const BASE_URL = `${SWAGGER_API_HOST}/api/v2/user`;

type ChangeInfoData = {
    first_name: string,
    second_name: string,
    email: string,
    phone: string,
    login: string,
    display_name: string,
};

type ChangePasswordData = {
    oldPassword: string,
    newPassword: string,
}

export class ProfileService {
    private static __instance?: ProfileService;
    private constructor() {}
    public static getInstance (): ProfileService {
        if (!this.__instance) {
            this.__instance = new this();
        }

        return this.__instance;
    }

    async changeInfo (data: ChangeInfoData): Promise<any> {
        return Api.getInstance().put(`${BASE_URL}/profile`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
            },
            data,
        });
    }
    async changePassword (data: ChangePasswordData): Promise<any> {
        return Api.getInstance().put(`${BASE_URL}/password`, {
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
            },
            data,
        });
    }
}

