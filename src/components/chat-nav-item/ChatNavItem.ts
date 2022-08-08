import BaseBlock from "../../common/base-block";
import './style.less';
import template from "./template.hbs";

class ChatNavItem extends BaseBlock {
    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = `chat-nav-item ${this._props.selected ? 'chat-nav-item-selected' : ''}`;
    }
}

export default ChatNavItem;