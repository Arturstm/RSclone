import './index.css';
import './components/textbook/textbook';
import './components/dictionary/dictionary';
import './components/autorization/autorization';
import './components/audio-challange/audio-challange';
import './components/sprint/sprint';
import './components/stats/stats';
const hamburgButton = document.querySelector('.hamburg-menu');
const navHamburg = document.querySelector('.hamburg');
const authLink = document.querySelector('.auth');
const hamburgList = document.querySelector('.hamburglist');
if (hamburgButton) {
  (hamburgButton as HTMLElement).addEventListener('click', (e) => {
    (hamburgButton as HTMLElement).classList.toggle('action');
    (navHamburg as HTMLElement).classList.toggle('action');
  });
}

if (localStorage.getItem('userName')) {
  if (authLink) {
    (authLink as HTMLElement).textContent = 'Выход';
  }
  if (hamburgList) {
    (((hamburgList as HTMLElement).lastElementChild as HTMLElement).firstElementChild as HTMLLinkElement).textContent =
      'Выход';
    console.log((hamburgList as HTMLElement).lastElementChild);
  }
}
