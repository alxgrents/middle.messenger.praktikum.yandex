import * as Handlebars from 'handlebars';
import ChatNavItem from "./ChatNavItem";
import {createPartialCallback} from "../../helpers/create-partial-callback";

Handlebars.registerPartial('chat-nav-item', createPartialCallback(ChatNavItem));

export default ChatNavItem;