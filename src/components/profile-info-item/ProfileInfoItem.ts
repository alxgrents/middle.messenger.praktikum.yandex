import BaseBlock from '../../common/base-block';
import template from './template.hbs';
import './style.less';

class ProfileInfoItem extends BaseBlock {
    protected render(): string {
        return template(this._props);
    }

    protected componentDidMount(): void {
        this._props.class = 'profile-info-item';
    }
}

export default ProfileInfoItem;
