import * as Handlebars from 'handlebars';
import Message from "./Message";
import {createPartialCallback} from "../../helpers/create-partial-callback";

Handlebars.registerPartial('message', createPartialCallback(Message));

export default Message;