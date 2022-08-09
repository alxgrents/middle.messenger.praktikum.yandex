import BaseBlock from "../../common/base-block";
import template from './template.hbs';
import {BaseBlockOptions} from "../../common/types";


class Form extends BaseBlock {
    constructor (options: BaseBlockOptions, tag = 'form') {
        super(options, tag);
    }

    protected render(): DocumentFragment {
        return this.compile(template, this._props);
    }

    protected componentDidMount() {
        super.componentDidMount();
        this.addBlockEvent('submit', this._onSubmit.bind(this));
    }

    private _onSubmit (event: Event): void {
        const data = this._getData();
        console.log(data);
        location.hash=this._props.action || '';
        event.preventDefault();
    }

    private _getData () {
        return Object.fromEntries(
            Array.from(this.getContent().querySelectorAll('input'))
                .map(element => [element.name, element.value])
        );
    }
}

export default Form;