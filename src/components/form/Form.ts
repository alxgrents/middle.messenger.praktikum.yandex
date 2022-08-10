import BaseBlock from '../../common/base-block';
import template from './template.hbs';
import { BaseBlockOptions, BaseBlockProps } from '../../common/types';
import Validator from '../../helpers/validator';

type FormOptions = BaseBlockOptions & {
    validators?: Record<string, Validator>
}

type FormProps = BaseBlockProps & {
    validators?: Record<string, Validator>
}

class Form extends BaseBlock {
    protected _props: FormProps;

    protected _inputs: Record<string, HTMLInputElement>;

    constructor(options: FormOptions, tag = 'form') {
        super(options, tag);
    }

    protected render(): DocumentFragment {
        const content = this.compile(template, this._props);

        this._inputs = Object.fromEntries(
            Array.from(content.querySelectorAll('input'))
                .map((element) => [element.name, element]),
        );

        return content;
    }

    protected componentDidMount() {
        super.componentDidMount();
        this.addBlockEvent('submit', this._onSubmit.bind(this));
        this.addBlockEvent('focusin', this._validate.bind(this));
        this.addBlockEvent('focusout', this._validate.bind(this));
        this.addBlockEvent('input', this._validate.bind(this));
    }

    private _onSubmit(event: Event): void {
        if (this._validate()) {
            const data = this._getData();
            // eslint-disable-next-line no-console
            console.log(data);
            // eslint-disable-next-line no-restricted-globals
            location.hash = this._props.action || '';
        }

        event.preventDefault();
    }

    private _validate(): boolean {
        const { validators } = this._props;
        if (validators !== undefined) {
            const results = Object.entries(this._inputs).map(([name, input]) => {
                const validator: Validator = validators[name];
                if (validator) {
                    const isValidated = validator.validate(input.value);

                    if (isValidated) {
                        input.classList.remove('invalid');
                    } else {
                        input.classList.add('invalid');
                    }
                    return isValidated;
                }
                return true;
            });

            const validateResult = results.every(Boolean);
            const button = this._children.submitButton as BaseBlock | undefined;
            if (button) {
                if (validateResult) {
                    button.getContent().classList.remove('base-button-disabled');
                } else {
                    button.getContent().classList.add('base-button-disabled');
                }
            }

            return validateResult;
        }
        // Если валидация не указана, то считаем, что она всегда пройдена
        return true;
    }

    private _getData() {
        return Object.fromEntries(
            Object.entries(this._inputs).map(([name, input]) => [name, input.value]),
        );
    }
}

export default Form;
