import BaseBlock from "../../common/base-block";
import './style.less';
import template from "./template.hbs";

class Message extends BaseBlock {
    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = `chat-message chat-message-${this._props.type} ${this._props.isViewer ? 'chat-message-viewer' : ''}`;
    }
}

export default Message;