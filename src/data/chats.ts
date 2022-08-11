import { freeze } from '../utils/freeze';

export type ChatData = {
    name: string,
    time: string,
    message: string,
    avatar: string,
    selected?: boolean,
    isViewer?: boolean,
    unreadMessages?: number,
}

export const CHATS: ChatData[] = freeze([
    {
        name: 'Андрей',
        time: '10:49',
        message: 'Изображение',
        unreadMessages: 2,
        avatar: './static/icons/no-avatar.png',
    },
    {
        name: 'Киноклуб',
        time: '12:00',
        message: 'стикер',
        isViewer: true,
        selected: true,
        avatar: './static/icons/no-avatar.png',
    },
    {
        name: 'Илья',
        time: '15:12',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        unreadMessages: 4,
        avatar: './static/icons/no-avatar.png',
    },
]);
