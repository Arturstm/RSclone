// // @ts-nocheck
// import './autorization.css';

// const toRegistration = document.querySelector('.toLogin');
// const toSingIn = document.querySelector('.toReg');
// const registration = document.querySelector('.auth__reg');
// const login = document.querySelector('.auth__singin');

// const baseUrl = 'https://rs-lang-179.herokuapp.com';

// toRegistration.addEventListener('mousedown', () => {
//   registration.classList.add('hide');
//   login.classList.remove('hide');
// });

// toSingIn.addEventListener('mousedown', () => {
//   login.classList.add('hide');
//   registration.classList.remove('hide');
// });

// const authForm = document.getElementById('auth__form');
// const logForm = document.getElementById('log__form');

// const authUserName = authForm.querySelector('#auth_userName');
// const authEmail = authForm.querySelector('#auth_email');
// const authPass = authForm.querySelector('#auth_pass');

// const logEmail = logForm.querySelector('#log_email');
// const logPass = logForm.querySelector('#log_pass');

// const createUser = async (user) => {
//   const rawResponse = await fetch('https://rs-lang-179.herokuapp.com/users', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });
//   const content = await rawResponse.json();

//   console.log(content);
//   return `${rawResponse.status}`;
// };

// const regUser = async (event) => {
//   event.preventDefault();
//   const resStatus = await createUser({
//     name: authUserName.value,
//     email: authEmail.value,
//     password: authPass.value,
//   });

//   if (resStatus === '200') {
//     console.log('Зарегистрирован');
//   } else {
//     console.log(`${resStatus}`);
//   }
// };

// const loginUser = async (user) => {
//   const rawResponse = await fetch('https://rs-lang-179.herokuapp.com/signin', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(user),
//   });

//   if (rawResponse.status === 200) {
//     const content = await rawResponse.json();
//     return content;
//   } else {
//     return rawResponse.status;
//   }
// };

// const signIn = async (e) => {
//   e.preventDefault();
//   const res = await loginUser({
//     email: logEmail.value,
//     password: logPass.value,
//   });

//   if (typeof res === 'number') {
//     console.log(`Error ${res}`);
//   } else {
//     const signInEvent = new Event('signin');
//     document.dispatchEvent(signInEvent);

//     localStorage.setItem('token', res.token);
//     localStorage.setItem('refreshToken', res.refreshToken);
//     localStorage.setItem('userID', res.userId);
//     localStorage.setItem('userName', res.name);
//     console.log(res);
//   }
// };

// authForm.addEventListener('submit', regUser);
// logForm.addEventListener('submit', signIn);

import './autorization.css';
interface NewUser {
  name: string;
  email: string;
  password: string;
}
interface OldUser {
  email: string;
  password: string;
}
// regexp взят отсюда https://ru.hexlet.io/blog/posts/validatsiya-email-na-javascript
const emailRegexp = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const toRegistration = document.querySelector('.toLogin');
const toSingIn = document.querySelector('.toReg');
const registration = document.querySelector('.auth__reg');
const login = document.querySelector('.auth__singin');
const logout = document.querySelector('.auth__exit-main');

const baseUrl = 'https://rs-lang-179.herokuapp.com';

if (toRegistration) {
  (toRegistration as HTMLElement).addEventListener('mousedown', () => {
    (registration as HTMLElement).classList.add('hide');
    (login as HTMLElement).classList.remove('hide');
  });
}
if (toSingIn) {
  (toSingIn as HTMLElement).addEventListener('mousedown', () => {
    (login as HTMLElement).classList.add('hide');
    (registration as HTMLElement).classList.remove('hide');
  });
}
const authForm = document.getElementById('auth__form');
const logForm = document.getElementById('log__form');

const authUserName = document.querySelector('#auth_userName');
const authEmail = document.querySelector('#auth_email');
const authPass = document.querySelector('#auth_pass');

const authBtnLogout = document.getElementById('auth__log-out-btn');
const authBtnToMain = document.getElementById('auth__to-main-btn');

const logEmail = document.querySelector('#log_email');
const logPass = document.querySelector('#log_pass');

function authLoginName() {
  document.getElementById('auth__exit-logout')!.textContent = localStorage.getItem('userName');
}

function authLoginSuccess() {
  (login as HTMLElement).classList.add('hide');
  (logout as HTMLElement).classList.remove('hide');
}

const createUser = async (user: NewUser) => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};

const regUser = async (event: Event) => {
  event.preventDefault();
  const resStatus = await createUser({
    name: (authUserName as HTMLFormElement).value,
    email: (authEmail as HTMLFormElement).value,
    password: (authPass as HTMLFormElement).value,
  });
  if (resStatus === '200') {
    console.log('Зарегистрирован');
    alert('Поздравляем! Вы зарегестрированы на LangTrip.');
    (registration as HTMLElement).classList.add('hide');
    (login as HTMLElement).classList.remove('hide');
  } else if (!emailRegexp.test((authEmail as HTMLInputElement).value as string)) {
    alert('Введите валидный email');
    console.log((authEmail as HTMLInputElement).value);
  } else if ((authPass as HTMLInputElement).value.length < 8) {
    alert('Пароль должен быть минимум 8 символов длинной');
  } else {
    alert('Пользователь уже зарегестрирован. Войдите или введите другие данные для регистрации');
    console.log(`${resStatus}`);
  }
};

const loginUser = async (user: OldUser) => {
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

const signIn = async (e: Event) => {
  e.preventDefault();
  const res = await loginUser({
    email: (logEmail as HTMLFormElement).value,
    password: (logPass as HTMLFormElement).value,
  });

  if (typeof res === 'number') {
    console.log(`Error ${res}`);
    alert('Одно из полей заполнено неверно. Попробуйте ещё раз.');
  } else {
    const signInEvent = new Event('signin');
    document.dispatchEvent(signInEvent);

    localStorage.setItem('token', res.token);
    localStorage.setItem('refreshToken', res.refreshToken);
    localStorage.setItem('userID', res.userId);
    localStorage.setItem('userName', res.name);
    authLoginName();
    authLoginSuccess();
    console.log(res);
  }
};

if (authForm) {
  authForm.addEventListener('submit', regUser);
}
if (logForm) {
  logForm.addEventListener('submit', signIn);
}

if (authBtnLogout) {
  authBtnLogout.addEventListener('click', () => {
    localStorage.clear();
    alert('Вы вышли из учетной записи');
    window.location.href = './index.html';
  });
}

if (authBtnToMain) {
  authBtnToMain.addEventListener('click', () => {
    window.location.href = './index.html';
  });
}
