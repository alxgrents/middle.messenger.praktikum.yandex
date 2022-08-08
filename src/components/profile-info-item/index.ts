import * as Handlebars from 'handlebars';
import ProfileInfoItem from "./ProfileInfoItem";
import {createPartialCallback} from "../../helpers/create-partial-callback";

Handlebars.registerPartial('profile-info-item', createPartialCallback(ProfileInfoItem));

export default ProfileInfoItem;