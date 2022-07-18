import MESSAGE_TYPE from '../constants/message-type';

/**
 * @typedef Message
 * @property {string} time
 * @property {string} type
 * @property {string} [text]
 * @property {string} [image]
 * @property {boolean} {isViewer}
 */

/**
 * @type Message[]
 */
const MESSAGES = [
    {
        type: MESSAGE_TYPE.TEXT,
        text: "Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.",
        time: "11:56",
    },
    {
        type: MESSAGE_TYPE.IMAGE,
        image: "static/images/message-image-example.png",
        time: "11:57",
    },
    {
        type: MESSAGE_TYPE.SMALL_TEXT,
        text: "Круто!",
        time: "12:00",
        isViewer: true,
    },
];

MESSAGES.forEach(Object.freeze);
Object.freeze(MESSAGES);

export default MESSAGES;