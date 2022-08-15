const VALIDATOR_SYMBOLS = {
    EN_CHARS: 'qwertyuiopasdfghjklzxcvbnm'.split(''),
    RUS_CHARS: 'ёйцукенгшщзхъфывапролджэячсмитьбю'.split(''),
    DIGITS: '1234567890'.split(''),
};

const CHARS = [
    ...VALIDATOR_SYMBOLS.EN_CHARS,
    ...VALIDATOR_SYMBOLS.RUS_CHARS,
];
const CAPITAL_CHARS = CHARS.map((value) => value.toUpperCase());

Object.freeze(VALIDATOR_SYMBOLS);

function createRegExp(symbols: string[]): RegExp {
    return new RegExp(`^([${symbols.join('')}]*)$`, 'i');
}

const VALIDATOR_REGEXP = {
    EN_CHARS: createRegExp(VALIDATOR_SYMBOLS.EN_CHARS),
    CHARS: createRegExp([...VALIDATOR_SYMBOLS.EN_CHARS, ...VALIDATOR_SYMBOLS.RUS_CHARS]),
    EN_CHARS_AND_DIGITS: createRegExp([
        ...VALIDATOR_SYMBOLS.EN_CHARS,
        ...VALIDATOR_SYMBOLS.DIGITS,
    ]),
    CHARS_AND_DIGITS: createRegExp([
        ...VALIDATOR_SYMBOLS.EN_CHARS,
        ...VALIDATOR_SYMBOLS.RUS_CHARS,
        ...VALIDATOR_SYMBOLS.DIGITS,
    ]),
    NUMBER: /^(\+?)(d*)&/,
    ANY_DIGIT: /\d+/,
    ANY_CAPITAL: new RegExp(`[${CAPITAL_CHARS.join('')}]+`),
    EMAIL: new RegExp(`^\\S*[${CAPITAL_CHARS.join('')}]+\\S*@\\S*\\.\\S*$`, 'i'),
    NAME: new RegExp(`^[${CAPITAL_CHARS.join('')}][${CHARS.concat('-').join('')}]*$`),
    ANY_CHAR: new RegExp(`[${CHARS.join('')}]+`, 'i'),
    PHONE: /^\+?\d+/i,
};

type ValidatorRuleType = 'max' | 'min' | 'include' | 'email' | 'phone'
    | 'noEmpty' | 'enChars' | 'chars' | 'enCharsAndDigits' | 'containChar' | 'charAndDigits'
    | 'name' | 'number' | 'containDigit' | 'containCapitalChar';

type ValidatorRule = {
    type: ValidatorRuleType,
    value?: number | string | string[],
}

class Validator {
    private readonly _rules: ValidatorRule[];

    constructor(rules: ValidatorRule[]) {
        this._rules = rules;
    }

    public static create(rules: Array<ValidatorRuleType | ValidatorRule>): Validator {
        return new Validator(rules.map((rule) => (typeof rule === 'string'
            ? { type: rule }
            : rule
        )));
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
        case 'enCharsAndDigits': return VALIDATOR_REGEXP.EN_CHARS_AND_DIGITS.test(value);
        case 'charAndDigits': return VALIDATOR_REGEXP.CHARS_AND_DIGITS.test(value);
        case 'number': return VALIDATOR_REGEXP.NUMBER.test(value);
        case 'containDigit': return VALIDATOR_REGEXP.ANY_DIGIT.test(value);
        case 'containCapitalChar': return VALIDATOR_REGEXP.ANY_CAPITAL.test(value);
        case 'email': return VALIDATOR_REGEXP.EMAIL.test(value);
        case 'containChar': return VALIDATOR_REGEXP.ANY_CHAR.test(value);
        case 'name': return VALIDATOR_REGEXP.NAME.test(value);
        case 'phone': return VALIDATOR_REGEXP.PHONE.test(value);
        case 'include': return rule.value
            ? value.includes(rule.value.toString())
            : true;

        // Валидация по неопределенному типу, по умолчанию проходит всегда
        default: return true;
        }
    }
}

export default Validator;
