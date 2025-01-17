import './styles/comeau-reset.css';
import './styles/styles.css';
import invalidIcon from './images/alpha-x-circle-outline.svg';


const countries = ['United States', 'United Kingdom', 'Canada'];

const invalidDivs = document.querySelectorAll('.invalid-message');
invalidDivs.forEach((div) => {
    const icon = document.createElement('img');
    icon.classList.add('invalid-icon');
    icon.src = invalidIcon;
    div.prepend(icon);
})

const setInputClass = (field, isValid) => {
    const messageDiv = document.querySelector(`.invalid-message.${field}`);
    isValid ? messageDiv.classList.remove('invalid') : messageDiv.classList.add('invalid');
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

    setInputClass('length', passInput.value > 8 && passInput.value < 20 ? true : false);
    setInputClass('letter', lowerRegex.test(passInput.value) ? true : false);
    setInputClass('number', digitRegex.test(passInput.value) ? true: false);
    setInputClass('symbol', symbolRegex.test(passInput.value) ? true: false);
    setInputClass('space', spaceRegex.test(passInput.value) ? true: false);
}


const confirmInput = document.querySelector('#confirm');
confirmInput.onblur = () => {
    const isValid = passInput.value === confirmInput.value ? true: false;
    setInputClass('confirm', isValid);
}

const submitButton = document.querySelector('.submit');
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    const checkDivs = () => {
        invalidDivs.forEach((div) => {
            if (div.classList.contains('invalid')) {
                return false;
            }
            return true;
        })
    }
    const checkInputs = () => {
        const inputs = document.querySelectorAll('input');
        inputs.forEach((input) => {
            if (input.value === '') {
                return false;
            }
            return true;
        })
    }
    const isValid = checkDivs() && checkInputs() ? true : false;
    setInputClass('submission', isValid);
})
