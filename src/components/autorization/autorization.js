
const toRegistration = document.querySelector('.toLogin');
const toSingIn = document.querySelector('.toReg');
const registration = document.querySelector('.auth__reg');
const login = document.querySelector('.auth__singin');

toRegistration.addEventListener( 'mousedown' , () => {
  registration.classList.add('hide');
  login.classList.remove('hide');
});

toSingIn.addEventListener('mousedown', () => {
  login.classList.add('hide');
  registration.classList.remove('hide');
});
