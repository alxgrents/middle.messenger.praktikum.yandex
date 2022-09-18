export type ChatData = {
    id: number,
    name: string,
    time: string,
    message: string,
    avatar: string,
    selected?: boolean,
    isViewer?: boolean,
    unreadMessages?: number,
}