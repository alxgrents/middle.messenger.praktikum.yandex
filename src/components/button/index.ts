import * as Handlebars from 'handlebars';
import Button from "./Button";
import {createPartialCallback} from "../../helpers/create-partial-callback";

Handlebars.registerPartial('button', createPartialCallback(Button));

export default Button;