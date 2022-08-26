import './autorization.scss';

const loginLayout = `
<form action='https://rs-lang-179.herokuapp.com/users'>
<h2>Login</h2>
    <label for="psw"><b>Password</b></label>
    <input id="login-password" type="password" placeholder="Enter password" name="psw" required minlength="8">
    <label for="email"><b>Email</b></label>
    <input id="login-email" type="email" placeholder="Enter email" name="email" required>
    <button type="submit" id="login-btn">Log in</button>
    <p>Don't have an account? <button id="registration-form-btn">sign in</button></p>
</form>
`;
const registrationLayout = `
<form action='https://rs-lang-179.herokuapp.com/users'>
<h2>Registration</h2>
    <label for="user-name"><b>Name</b></label>
    <input id="registration-user-name" type="text" placeholder="name" name="user-name" required>
    <label for="psw"><b>Password</b></label>
    <input id="registration-password" type="password" placeholder="password" name="psw" required minlength="8">
    <label for="email"><b>Email</b></label>
    <input id="registration-email" type="email" placeholder="email" name="email" required title="wadaw">
    <button type="submit" id="signup-btn">Sign up</button>
    <p>Already have an account? <button id="login-form-btn">login</button></p>
</form>
`;

/////////////////////base///////////////////////
////////////////// interfaces base///////

interface IUser {
  name?: string;
  email: string;
  password: string;
}

interface ILoggedUser {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
  email?: string;
}

////////////////requests base///////////

const baseUrl = 'https://rs-lang-179.herokuapp.com';

async function loginUser(user: IUser): Promise<ILoggedUser> {
  const response = await fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const res = await response.json();
  res.email = user.email;
  return res;
}

async function createUser(body: IUser): Promise<void> {
  const user = await fetch(`${baseUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  await user.json();
}

//////////////////////////////////////////////////////////////
//show/hide auth
function authorizationShowHide(el: HTMLElement): void {
  el.classList.toggle('authorization-hide');
  el.classList.toggle('authorization-show');
}
function getCurrentUser(): ILoggedUser {
  return JSON.parse(localStorage.getItem('user') || '');
}
// render logged user
function renderLoggedUser(user: { name: string; email: string }) {
  const userContainer = document.getElementById('logged-user-container') as HTMLElement;

  const userImage = new Image(50, 50);
  userImage.src = '../assets/userLogo.png'; // TO DO add icon

  const logOutBtn = document.createElement('button');
  logOutBtn.innerHTML = 'logOut';
  logOutBtn.id = 'log-out-btn';

  userContainer.innerHTML = `
    <div>
      <div id="logged-user-name" align="center">${getCurrentUser().name}</div>
      <div id="logged-user-email">${user.email}</div>
    </div>
  `;
  userContainer.append(userImage, logOutBtn);
  (<HTMLElement>document.querySelector('header')).append(userContainer);
}
function renderAuthorizationBtn(): void {
  const authorization = document.getElementById('authorization-container') as HTMLElement;
  const loginBtn = document.createElement('button');
  loginBtn.id = 'authorization-btn';
  loginBtn.innerHTML = 'login';
  (<HTMLElement>document.getElementById('logged-user-container')).innerHTML = '';
  (<HTMLElement>document.getElementById('logged-user-container')).append(loginBtn);

  document.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;

    if (target === loginBtn) {
      authorizationShowHide(authorization);
    }
  });
}
async function logInUser(user: IUser): Promise<void> {
  const loggedUser = await loginUser(user);
  localStorage.setItem('user', JSON.stringify(loggedUser));
  renderLoggedUser({ name: user.name ?? '', email: user.email });
  authorizationShowHide(document.getElementById('authorization-container') as HTMLElement);
}

function logOutUser(): void {
  localStorage.removeItem('user');
  (<HTMLElement>document.getElementById('logged-user-container')).innerHTML = '';
  renderAuthorizationBtn();
}

//////////////////////////////////////////////////////////////

class LoginForm {
  passwordField: HTMLInputElement | null;

  emailField: HTMLInputElement | null;

  layout: string;

  formContainer: HTMLElement;

  constructor() {
    this.layout = loginLayout;
    this.formContainer = this.renderContainer() as HTMLElement;
    this.emailField = null;
    this.passwordField = null;
    this.initHandlers();
  }

  initHandlers(): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.id === 'login-btn') {
        event.preventDefault();
        this.loginUser();
      }

      if (target.id === 'log-out-btn') {
        logOutUser();
      }
    });
  }

  loginUser(): void {
    logInUser({
      password: (this.passwordField as HTMLInputElement).value,
      email: (this.emailField as HTMLInputElement).value,
    });
    document.getElementById('authorization-btn')?.remove();
  }

  renderContainer(): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = this.layout;
    container.id = 'login-form-container';
    return container;
  }

  initElems(): void {
    this.emailField = document.getElementById('login-email') as HTMLInputElement;
    this.passwordField = document.getElementById('login-password') as HTMLInputElement;
  }
}

///////////////////////////////////////////////////////////////

class RegistrationForm {
  nameField: HTMLInputElement | null;

  passwordField: HTMLInputElement | null;

  emailField: HTMLInputElement | null;

  layout: string;

  formContainer: HTMLElement;

  constructor() {
    this.layout = registrationLayout;
    this.formContainer = this.renderContainer() as HTMLElement;
    this.nameField = null;
    this.emailField = null;
    this.passwordField = null;
    this.initHandlers();
  }

  initElems(): void {
    this.nameField = document.getElementById('registration-user-name') as HTMLInputElement;
    this.emailField = document.getElementById('registration-email') as HTMLInputElement;
    this.passwordField = document.getElementById('registration-password') as HTMLInputElement;
  }

  initHandlers(): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.id === 'signup-btn') {
        event.preventDefault();
        this.registerUser();
      }
    });
  }

  async registerUser(): Promise<void> {
    await createUser({
      name: (this.nameField as HTMLInputElement).value,
      email: (this.emailField as HTMLInputElement).value,
      password: (this.passwordField as HTMLInputElement).value,
    });
    logInUser({
      password: (this.passwordField as HTMLInputElement).value,
      email: (this.emailField as HTMLInputElement).value,
    });
  }

  renderContainer(): HTMLElement {
    const container = document.createElement('div');
    container.innerHTML = this.layout;
    container.id = 'registration-form-container';
    return container;
  }
}

///////////////////////////////////////////////////////////////

class AuthorizationWindow {
  formReg: RegistrationForm;

  formLog: LoginForm;

  container: HTMLElement;

  constructor() {
    this.formReg = new RegistrationForm();
    this.formLog = new LoginForm();
    this.container = this.renderAuthorizationContainer();
  }

  renderAuthorizationContainer(): HTMLElement {
    const container = document.createElement('div');
    container.id = 'authorization-container';
    container.classList.add('authorization-hide');
    container.append(this.formLog.formContainer, this.formReg.formContainer);
    return container;
  }
}

//////////////////////////////////////////////////////////////
class Authorisation {
  auth: AuthorizationWindow;

  constructor() {
    this.initHandlers();
    this.auth = new AuthorizationWindow();
    this.openPage();
  }

  initHandlers(): void {
    document.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      event.preventDefault();

      if (target.id === 'authorization-btn') {
        this.auth.formLog.initElems();
        this.auth.formReg.initElems();
      }

      if (target.id === 'login-form-btn') {
        (this.auth.formReg as RegistrationForm).formContainer.style.display = 'none';
        (this.auth.formLog as LoginForm).formContainer.style.display = 'flex';
      }

      if (target.id === 'registration-form-btn') {
        (this.auth.formReg as RegistrationForm).formContainer.style.display = 'flex';
        (this.auth.formLog as LoginForm).formContainer.style.display = 'none';
      }
    });
  }

  openPage(): void {
    document.body.appendChild(this.auth.container);
  }
}

const auth = new Authorisation();

auth.openPage();
