import {
    AuthorizationPage,
    RegistrationPage,
} from "./entry";
import ErrorPage from './error';
import CHATS from '../data/chats';
import MESSAGES from "../data/messages";
import PROFILE from '../data/profile';
import {RouteMap} from "../helpers/router";
import ChatPage from "./chat";
import {
    ProfileInfoPage,
    ProfileChangePasswordPage,
    ProfileRedactPage,
} from "./profile";

const PAGE_ROUTES_MAP: RouteMap = {
    'error-500': ErrorPage.createServerErrorPage,
    'error-404': ErrorPage.createNotFoundPage,
    'authorization': AuthorizationPage.create,
    'registration': RegistrationPage.create,
    'profile': () => ProfileInfoPage.create(PROFILE),
    'profile-redact': () => ProfileRedactPage.create(PROFILE),
    'profile-change-password': () => ProfileChangePasswordPage.create(PROFILE),
    '': () => ChatPage.create({chats: CHATS, currentChat: CHATS.find(chat => chat.selected), messages: MESSAGES}),
    'baseBlock': () => '',
};

export default PAGE_ROUTES_MAP;