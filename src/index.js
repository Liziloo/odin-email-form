import './styles/comeau-reset.css';
import './styles/styles.css';
import invalidIcon from './images/alpha-x-circle-outline.svg';


const countries = ['United States', 'United Kingdom', 'Canada'];
const myForm = document.querySelector('form');

const inputs = document.querySelectorAll('input');
inputs.forEach((input) => {
    input.setCustomValidity('');
})

const invalidDivs = document.querySelectorAll('.invalid-message');
invalidDivs.forEach((div) => {
    const icon = document.createElement('img');
    icon.classList.add('invalid-icon');
    icon.src = invalidIcon;
    div.prepend(icon);
})

const setInputClass = (field, isValid) => {
    const messageDiv = document.querySelector(`.invalid-message.${field}`);

    const currentInput = document.querySelector(`input#${field}`);
    if (currentInput) {
        currentInput.setCustomValidity('');
    } else {
        const passInput = document.querySelector('input#pass');
        passInput.setCustomValidity('');
    }
    isValid ? 
        messageDiv.classList.remove('invalid') && currentInput.setCustomValidity('') : messageDiv.classList.add('invalid') && currentInput.setCustomValidity('Error');
}

const emailInput = document.querySelector('#email');
emailInput.onblur = () => {
    const isValid = emailInput.checkValidity();
    setInputClass('email', isValid);
}

const countryInput = document.querySelector('#country');
for (let country of countries) {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryInput.appendChild(option);
}

countryInput.onblur = () => {
    const isValid = countries.includes(countryInput.value);
    setInputClass('country', isValid);
}

const zipInput = document.querySelector('#zip');
zipInput.onblur = () => {
    const zipPatterns = {
        'United States': /^\d{5}(-\d{4})?$/,
        'Canada': /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
        'United Kingdom': /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/
    };
    const pattern = zipPatterns[countryInput.value];
    const isValid = pattern ? pattern.test(zipInput.value) : false;

    setInputClass('zip', isValid);
}

const passInput = document.querySelector('#pass');
passInput.onblur = () => {
    const lowerRegex = /^(?=.*[a-zA-Z])/;
    const digitRegex = /^(?=.*\d+)/;
    const symbolRegex = /^(?=.*[$,#?!@%^&*.])/;
    const spaceRegex = /^(?!.*\s)/;

    setInputClass('length', passInput.value.length > 7 && passInput.value.length < 20 ? true : false);
    setInputClass('letter', lowerRegex.test(passInput.value) ? true : false);
    setInputClass('number', digitRegex.test(passInput.value) ? true: false);
    setInputClass('symbol', symbolRegex.test(passInput.value) ? true: false);
    setInputClass('space', spaceRegex.test(passInput.value) ? true: false);

    const passInvalidDivs = document.querySelectorAll('.passinvalid');
    passInvalidDivs.forEach((div) => {
        if (div.classList.contains('invalid')) {
            passInput.setCustomValidity('Error');
        }
    })
}


const confirmInput = document.querySelector('#confirm');
confirmInput.onblur = () => {
    const isValid = passInput.value === confirmInput.value ? true: false;
    setInputClass('confirm', isValid);
}

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalidMessage = document.getElementsByClassName('invalid-message submission')[0];
    if (!myForm.checkValidity() || !checkInputs()) {
        invalidMessage.classList.add('invalid');
    } else {
        invalidMessage.classList.remove('invalid');
        myForm.submit();
    }
})

const checkInputs = () => {
    let isValid = true;
    inputs.forEach((input) => {
        if (input.value === '') {
            isValid = false;
        }
    })
    return isValid
}