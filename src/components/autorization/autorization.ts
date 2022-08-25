import './autorization.css';

const toRegistration = <HTMLElement>document.querySelector('.toReg');
const toSingIn = <HTMLElement>document.querySelector('.toLogin');
const registration = <HTMLElement>document.querySelector('.auth__reg');
const login = <HTMLElement>document.querySelector('.auth__singin');

toRegistration.addEventListener('click', () => {
  registration.classList.add('hide');
  login.classList.remove('hide');
});

toSingIn.addEventListener('click', () => {
  login.classList.add('hide');
  registration.classList.remove('hide');
});
console.log('auto');
