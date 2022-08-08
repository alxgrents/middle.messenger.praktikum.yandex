import * as Handlebars from 'handlebars';
import InputField from "./InputField";
import {createPartialCallback} from "../../helpers/create-partial-callback";

Handlebars.registerPartial('input-field', createPartialCallback(InputField));

export default InputField;