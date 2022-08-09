import { freeze } from '../utils/freeze';

type Chat = {
    name: string,
    time: string,
    message: string,
    avatar: string,
    selected?: boolean,
    isViewer?: boolean,
    unreadMessages?: number,
}

const CHATS: Chat[] = [
    {
        name: 'Андрей',
        time: '10:49',
        message: 'Изображение',
        unreadMessages: 2,
    },
    {
        name: 'Киноклуб',
        time: '12:00',
        message: 'стикер',
        isViewer: true,
        selected: true,
    },
    {
        name: 'Илья',
        time: '15:12',
        message: 'Друзья, у меня для вас особенный выпуск новостей!...',
        unreadMessages: 4,
        avatar: './static/icons/no-avatar.png',
    },
].map((chat) => Object.assign(chat, {
    avatar: chat.avatar || './static/icons/no-avatar.png',
}));

export default freeze(CHATS);
