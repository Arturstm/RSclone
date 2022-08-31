import './index.css';
import './components/textbook/textbook';
import './components/dictionary/dictionary';
// import './components/autorization/autorization';
import './components/audio-challange/audio-challange';
import './components/sprint/sprint';
const hamburgButton = document.querySelector('.hamburg-menu');
const navHamburg = document.querySelector('.hamburg');
if (hamburgButton) {
  (hamburgButton as HTMLElement).addEventListener('click', (e) => {
    (hamburgButton as HTMLElement).classList.toggle('action');
    (navHamburg as HTMLElement).classList.toggle('action');
  });
}
