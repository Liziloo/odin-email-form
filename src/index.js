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
    !isValid ? messageDiv.classList.add('invalid') : messageDiv.classList.remove('invalid');
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

const confirmInput = document.querySelector('#confirm');

