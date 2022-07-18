/**
 * @typedef Chat
 * @property {string} name
 * @property {string} time
 * @property {string} message
 * @property {boolean} [selected]
 * @property {boolean} [isViewer]
 * @property {string} [avatar]
 * @property {number} [unreadMessages]
 */

/**
 * @type {Chat[]}
 */
const CHATS =[
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
    },
].map(chat => Object.assign(chat, {
    avatar: chat.avatar || "./static/icons/no-avatar.png",
}));

CHATS.forEach(Object.freeze);
Object.freeze(CHATS);

export default CHATS;