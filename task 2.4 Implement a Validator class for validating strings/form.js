class Validator {
    isName(value) {
        return /^([А-ЯЁЇІЄҐ][а-яёїієґ]{1,23}|[A-Z][a-z]{1,23})$/.test(value);
    }

    isEmail(value) {
        return /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(value);
    }

    isDate(value) {
        return /\d{2}(\/)\d{2}(\/)\d{4}/.test(value);
    }

    isRequired(value) {
        return /^(?=[А-Яа-яёЁЇїІіЄєҐґA-Za-z0-9])[А-Яа-яёЁЇїІіЄєҐґA-Za-z0-9\s]{0,20}[А-Яа-яёЁЇїІіЄєҐґA-Za-z0-9]$/i.test(value);
    }
}

const validation = new Validator();

let checkValidation = (value, rule) => {
    switch (rule) {
        case 'name':
            return validation.isName(value);
        case 'email':
            return validation.isEmail(value);
        case 'date':
            return validation.isDate(value);
        case 'text':
            return validation.isRequired(value);
    }
};

const inputs = document.querySelectorAll('.feedback-input');

document.querySelector('form').addEventListener('change', function () {
    for (let input of inputs) {
        let rule = input.name;
        let value = input.value;
        if (checkValidation(value, rule)) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
        }
    }
})
