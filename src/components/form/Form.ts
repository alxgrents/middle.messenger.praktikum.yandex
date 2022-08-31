import BaseBlock from '../../common/base-block';
import template from './template.hbs';
import { BaseBlockOptions, BaseBlockProps } from '../../common/types';
import Validator from '../../helpers/validator';

type FormOptions = BaseBlockOptions & {
    validators?: Record<string, Validator>
    onSubmit?: (data: Record<string, any>) => any,
}

type FormProps = BaseBlockProps & {
    validators?: Record<string, Validator>
}

class Form extends BaseBlock {
    protected _props: FormProps;

    protected _inputs: Record<string, HTMLInputElement>;
    protected _labels: Record<string, HTMLLabelElement>;

    constructor(options: FormOptions, tag = 'form') {
        super(options, tag);
        this.update({
            events: {
                submit: this._onSubmit,
                focusin: this._validate,
                focusout: this._validate,
                input: this._validate,
            },
        });
    }

    protected render(): DocumentFragment {
        const content = this.compile(template, this._props);

        this._inputs = Object.fromEntries(
            Array.from(content.querySelectorAll('input'))
                .map((element) => [element.name, element]),
        );
        this._labels = {};
        Object.keys(this._inputs).forEach((name) => {
            const label = content.querySelector(`label[for=${name}]`) as HTMLLabelElement;
            if (label) {
                this._labels[name] = label;
            }
        });


        return content;
    }

    private _onSubmit = (event: Event): void => {
        event.preventDefault();
        if (this._validate()) {
            const data = this._getData();

            if (typeof this._props.onSubmit === 'function') {
                this._props.onSubmit(data);
            }
        }
    };

    private _validate = (): boolean => {
        const { validators } = this._props;
        if (validators !== undefined) {
            const results = Object.entries(this._inputs).map(([name, input]) => {
                const validator: Validator = validators[name];
                if (validator) {
                    const isValidated = validator.validate(input.value);

                    const elements = [
                        input,
                        this._labels[name],
                    ].filter(Boolean);

                    if (isValidated) {
                        elements.forEach(element => element.classList.remove('invalid'))
                    }
                    else {
                        elements.forEach(element => element.classList.add('invalid'))
                    }

                    return isValidated;
                }
                return true;
            });

            return results.every(Boolean);
        }
        // Если валидация не указана, то считаем, что она всегда пройдена
        return true;
    };

    private _getData() {
        return Object.fromEntries(
            Object.entries(this._inputs).map(([name, input]) => [name, input.value]),
        );
    }
}

export default Form;
