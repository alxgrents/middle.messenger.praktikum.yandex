import { MessageType } from '../constants/message-type';
import { freeze } from '../utils/freeze';

type TMessage = {
    time: string,
    type: MessageType,
    text?: string,
    image?: string,
    isViewer?: boolean,
}

const MESSAGES: TMessage[] = [
    {
        type: 'text',
        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической '
            + 'истории — НАСА в какой-то момент попросила Хассельблад адаптировать '
            + 'модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты '
            + 'летали с моделью 500 EL — и к слову говоря, все тушки этих камер все '
            + 'еще находятся на поверхности Луны, так как астронавты с собой забрали '
            + 'только кассеты с пленкой.\n\nХассельблад в итоге адаптировал SWC для '
            + 'космоса, но что-то пошло не так и на ракету они так никогда и не попали.'
            + ' Всего их было произведено 25 штук, одну из них недавно продали на '
            + 'аукционе за 45000 евро.',
        time: '11:56',
    },
    {
        type: 'image',
        image: 'static/images/message-image-example.png',
        time: '11:57',
    },
    {
        type: 'smallText',
        text: 'Круто!',
        time: '12:00',
        isViewer: true,
    },
];

export default freeze(MESSAGES);
