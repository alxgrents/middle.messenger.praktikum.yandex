import {
    ChatData,
    MessageData,
    ProfileData,
    CHATS,
    MESSAGES,
    PROFILE,
} from "../data";

export class Context {
    private static __instance: Context;
    public readonly chats: ChatData[];
    public readonly messages: MessageData[];
    public readonly profile: ProfileData;

    public static getInstance () {
        if (!Context.__instance) {
            Context.__instance = new Context();
        }

        return Context.__instance;
    }

    private constructor () {
        this.chats = CHATS;
        this.messages = MESSAGES;
        this.profile = PROFILE;
    }

    get currentChat (): ChatData | undefined {
        return this.chats.find((chat) => chat.selected);
    }
}