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

    async changeInfo (data: ChangeInfoData): Promise<boolean> {
        try {
            await Api.getInstance().post(`${BASE_URL}/profile`, {
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
    async changePassword (data: ChangePasswordData): Promise<boolean> {
        try {
            await Api.getInstance().post(`${BASE_URL}/password`, {
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
    // async changeAvatar (data): Promise<boolean> {}
}

