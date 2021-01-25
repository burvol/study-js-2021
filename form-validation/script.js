'use strict';

//Валідація форми. Створимо свою бібліотеку валідації.

const VALIDATOR = {
    patterns: {
        name: /^[a-zA-Z]{4,}$/,
        email: /^([a-z0-9\.-]+)/,
        password: /^[a-z0-9]{6,18}$/,
    },
    validate(formElement) {
        //спочатку збираємо інпути
        const inputs = Array.from(formElement.querySelectorAll('input'));

        //для кожного інпута витягуємо його імя і значення
        const results = inputs.reduce((acc, {name, value}) => {
            const valid = this.isValid(name, value);

            //запишимо в обєкт ключ і значення валідації
            acc[name] = valid;

            console.group('group');
            console.log('name: ', name);
            console.log('value: ', value);
            console.log('valid: ', valid);
            console.groupEnd('group');

            //вертаємо акумулятор на наступну ітерацію
            return acc;
        }, {});

        console.log('results: ', results);

        //перевіряємо наші значення відносно наших патернів(patterns)
        //маючи результати нашої валідації ми перевіряємо чи всі значення інпутів валідні
        //Якщо хочаб одне значення - false, верне значення false. Значення true буде тоді коли всі будуть true
        const valid = Object.values(results).every(value => value);

        return {
            valid,
            results,
        };
    },
    isValid(patternKey, value) {
        //бере регулярний вираз і методом test ми отпимуємо буль, чи підходить чи не підходить
        return this.patterns[patternKey].test(value);
    },
};

const form = document.querySelector('.js-signup');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();

    const validationResults = VALIDATOR.validate(form);

    if(!validationResults.valid) {
        alert('Oh no form is not valid!!!!');
        console.log(validationResults.results);
        return;
    }

    alert('Beep boop, thanks and have fun!');
    form.reset();

    console.log('validationResults: ', validationResults);
}