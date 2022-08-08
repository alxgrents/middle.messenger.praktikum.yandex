import * as Handlebars from 'handlebars';
import Link from "./Link";
import {createPartialCallback} from "../../helpers/create-partial-callback";

Handlebars.registerPartial('link', createPartialCallback(Link));

export default Link;