import { MessageType } from '../constants/message-type';

export type MessageData = {
    time: string,
    type: MessageType,
    text?: string,
    image?: string,
    isViewer?: boolean,
}