import './styles/comeau-reset.css';
import './styles/styles.css';
import invalidIcon from './images/alpha-x-circle-outline.svg';

const invalidDivs = document.querySelectorAll('.invalid-message');
invalidDivs.forEach((div) => {
    const icon = document.createElement('img');
    icon.classList.add('invalid');
    icon.src = invalidIcon;
    div.prepend(icon);
})

const emailInput = document.querySelector('#email');
emailInput.onblur = () => {
    const messageDiv = document.querySelector('.invalid-message.email');
    if (!emailInput.checkValidity()) {
        messageDiv.style.display = 'flex';
    } else {
        messageDiv.style.display = 'none';
    }
}

const countryInput = document.querySelector('#country');

const zipInput = document.querySelector('#zip');

const passInput = document.querySelector('#pass');

const confirmInput = document.querySelector('#confirm');

