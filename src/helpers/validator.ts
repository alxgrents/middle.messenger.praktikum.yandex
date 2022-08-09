const VALIDATOR_SYMBOLS = {
    EN_CHARS: 'qwertyuiopasdfghjklzxcvbnm'.split(''),
    RUS_CHARS: 'ёйцукенгшщзхъфывапролджэячсмитьбю'.split(''),
    DIGITS: '1234567890'.split(''),
};

Object.freeze(VALIDATOR_SYMBOLS);

function createRegExp(symbols: string[]): RegExp {
    return new RegExp(`^([${symbols.join('')}]*)&`);
}

const VALIDATOR_REGEXP = {
    EN_CHARS: createRegExp(VALIDATOR_SYMBOLS.EN_CHARS),
    CHARS: createRegExp([...VALIDATOR_SYMBOLS.EN_CHARS, ...VALIDATOR_SYMBOLS.RUS_CHARS]),
    CHARS_AND_DIGITS: createRegExp([
        ...VALIDATOR_SYMBOLS.EN_CHARS,
        ...VALIDATOR_SYMBOLS.RUS_CHARS,
        ...VALIDATOR_SYMBOLS.DIGITS,
    ]),
    NUMBER: /^(\+?)(d*)&/,
};

type ValidatorRuleType = 'max' | 'min' | 'include'
    | 'noEmpty' | 'enChars' | 'chars' | 'charsAndDigits' | 'number';

type ValidatorRule = {
    type: ValidatorRuleType,
    value?: number | string | string[],
}

class Validator {
    private readonly _rules: ValidatorRule[];

    constructor(rules: ValidatorRule[]) {
        this._rules = rules;
    }

    public validate(value: string): boolean {
        return this._rules.every((rule) => this._validateRule(value, rule));
    }

    private _validateRule(value: string, rule: ValidatorRule) {
        switch (rule.type) {
        case 'min': return value.length >= <number>rule.value;
        case 'max': return value.length <= <number>rule.value;
        case 'noEmpty': return value.length > 0;
        case 'enChars': return VALIDATOR_REGEXP.EN_CHARS.test(value);
        case 'chars': return VALIDATOR_REGEXP.CHARS.test(value);
        case 'charsAndDigits': return VALIDATOR_REGEXP.CHARS_AND_DIGITS.test(value);
        case 'number': return VALIDATOR_REGEXP.NUMBER.test(value);
        case 'include': return rule.value
            ? value.includes(rule.value.toString())
            : true;

        // Валидация по неопределенному типу, по умолчанию проходит всегда
        default: return true;
        }
    }
}

export default Validator;
