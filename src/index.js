import './styles/comeau-reset.css';
import './styles/styles.css';
import invalidIcon from './images/alpha-x-circle-outline.svg';

const countries = ['United State', 'United Kingdom', 'Canada', 'Mexico'];

const invalidDivs = document.querySelectorAll('.invalid-message');
invalidDivs.forEach((div) => {
    const icon = document.createElement('img');
    icon.classList.add('invalid-icon');
    icon.src = invalidIcon;
    div.prepend(icon);
})

const emailInput = document.querySelector('#email');
emailInput.onblur = () => {
    const messageDiv = document.querySelector('.invalid-message.email');
    if (!emailInput.checkValidity()) {
        messageDiv.classList.add('invalid');
    } else {
        messageDiv.classList.remove('invalid');
    }
}

const countryInput = document.querySelector('#country');
for (let country of countries) {
    const option = document.createElement('option');
    option.value = country;
    option.textContent = country;
    countryInput.appendChild(option);
}
countryInput.onblur = () => {
    const messageDiv = document.querySelector('.invalid-message.country');
    if (!countries.includes(countryInput.value)) {
        messageDiv.classList.add('invalid');
    } else {
        messageDiv.classList.remove('invalid');
    }
}

const zipInput = document.querySelector('#zip');

const passInput = document.querySelector('#pass');

const confirmInput = document.querySelector('#confirm');

