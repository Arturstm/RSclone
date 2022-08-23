const hamburgButton = document.querySelector('.hamburg-menu') as HTMLElement;
const navHamburg = document.querySelector('.hamburg') as HTMLElement;

console.log("Hellow")

hamburgButton.addEventListener('click', (e) => {
    hamburgButton.classList.toggle('action');
    navHamburg.classList.toggle('action');
});