import {
    authorization,
    registration,
} from './entry';
import {
    ErrorPage,
    notFoundError,
    serverError,
} from './error';
import chat from './chat';
import {
    profileChangePassword,
    profileInfo,
    profileRedact,
} from './profile';
import CHATS from '../data/chats';
import MESSAGES from "../data/messages";
import PROFILE from '../data/profile';
import {RouteMap} from "../helpers/router";

export const PAGE_ROUTES_MAP: RouteMap = {
    'error-500': serverError,
    'error-404': () => new ErrorPage({
        message: 'Не туда попали',
        errorCode: '404',
    }),
    'authorization': authorization,
    'registration': registration,
    'profile': () => profileInfo({profile: PROFILE}),
    'profile-redact': () => profileRedact({profile: PROFILE}),
    'profile-change-password': () => profileChangePassword({profile: PROFILE}),
    '': () => chat({chats: CHATS, currentChat: CHATS.find(chat => chat.selected), messages: MESSAGES}),
    'baseBlock': () => '',
};