// @ts-nocheck
import './autorization.css';

const toRegistration = document.querySelector('.toLogin');
const toSingIn = document.querySelector('.toReg');
const registration = document.querySelector('.auth__reg');
const login = document.querySelector('.auth__singin');

const baseUrl = 'https://rs-lang-179.herokuapp.com';

toRegistration.addEventListener('mousedown', () => {
  registration.classList.add('hide');
  login.classList.remove('hide');
});

toSingIn.addEventListener('mousedown', () => {
  login.classList.add('hide');
  registration.classList.remove('hide');
});

const authForm = document.getElementById('auth__form');
const logForm = document.getElementById('log__form');

const authUserName = authForm.querySelector('#auth_userName');
const authEmail = authForm.querySelector('#auth_email');
const authPass = authForm.querySelector('#auth_pass');

const logEmail = logForm.querySelector('#log_email');
const logPass = logForm.querySelector('#log_pass');

const createUser = async (user) => {
  const rawResponse = await fetch('https://rs-lang-179.herokuapp.com/users', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const content = await rawResponse.json();

  console.log(content);
  return `${rawResponse.status}`;
};

const regUser = async (event) => {
  event.preventDefault();
  const resStatus = await createUser({
    name: authUserName.value,
    email: authEmail.value,
    password: authPass.value,
  });

  if (resStatus === '200') {
    console.log('Зарегистрирован');
  } else {
    console.log(`${resStatus}`);
  }
};

const loginUser = async (user) => {
  const rawResponse = await fetch('https://rs-lang-179.herokuapp.com/signin', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  if (rawResponse.status === 200) {
    const content = await rawResponse.json();
    return content;
  } else {
    return rawResponse.status;
  }
};

const signIn = async (e) => {
  e.preventDefault();
  const res = await loginUser({
    email: logEmail.value,
    password: logPass.value,
  });

  if (typeof res === 'number') {
    console.log(`Error ${res}`);
  } else {
    const signInEvent = new Event('signin');
    document.dispatchEvent(signInEvent);

    localStorage.setItem('token', res.token);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('userID', res.userId);
    localStorage.setItem('userName', res.name);
    console.log(res);
  }
};

authForm.addEventListener('submit', regUser);
logForm.addEventListener('submit', signIn);
