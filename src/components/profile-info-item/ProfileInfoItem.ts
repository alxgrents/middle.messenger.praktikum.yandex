import BaseBlock from '../../common/base-block';
import './style.less';
const template = require('./template.hbs');

class ProfileInfoItem extends BaseBlock {
    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-info-item';
    }
}

export default ProfileInfoItem;
