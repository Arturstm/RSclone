import './index.css';
// import './components/autorization/autorization';
const hamburgButton = document.querySelector('.hamburg-menu');
const navHamburg = document.querySelector('.hamburg');
if (hamburgButton) {
  (hamburgButton as HTMLElement).addEventListener('click', (e) => {
    (hamburgButton as HTMLElement).classList.toggle('action');
    (navHamburg as HTMLElement).classList.toggle('action');
  });
}
