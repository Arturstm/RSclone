import './sprint.css';
import { fetchData, url, ResponseItem } from '../textbook/textbook';
import { getRandomItem, shuffle } from '../audio-challange/audio-challange';

const startSprint = document.querySelector('#start-sprint');
const sprintContent = document.querySelector('.sprint-content') as HTMLElement;
const sprintInputs = Array.from(document.getElementsByClassName('sprint-level__radio-btn'));
let level = 0;
let data: Array<ResponseItem> = [];

async function getSprintContent(l: number) {
  const currentData: Array<ResponseItem> = [];
  for (let i = 0; i < 30; i++) {
    const dataFromOnePage = await fetchData(i, l);
    dataFromOnePage.forEach((item: ResponseItem) => {
      currentData.push(item);
    });
    data = currentData;
  }
  sprintContent.innerHTML = '';
  let currentItem = data[0];
  currentItem = data[getRandomItem(data.length)];
  const sprintWordBlock = document.createElement('div');
  sprintWordBlock.classList.add('sprint__word-block');
  sprintContent.append(sprintWordBlock);
  const sprintWord = document.createElement('p');
  sprintWord.classList.add('sprint__word');
  sprintWordBlock.append(sprintWord);
  const sprintTranslation = document.createElement('p');
  sprintTranslation.classList.add('sprint__translation');
  sprintWordBlock.append(sprintTranslation);
  const sprintResultIcon = document.createElement('i');
  sprintWordBlock.append(sprintResultIcon);
  const sprintButtonBlock = document.createElement('div');
  sprintButtonBlock.classList.add('sprint__button-block');
  sprintContent.append(sprintButtonBlock);
  const sprintSbmitBtn = document.createElement('button');
  sprintSbmitBtn.classList.add('btn');
  sprintSbmitBtn.classList.add('btn-submit');
  sprintSbmitBtn.setAttribute('id', 'sprint-submit');
  sprintSbmitBtn.textContent = 'Правильно';
  sprintButtonBlock.append(sprintSbmitBtn);
  const sprintCancelBtn = document.createElement('button');
  sprintCancelBtn.classList.add('btn');
  sprintCancelBtn.classList.add('btn-cancel');
  sprintCancelBtn.setAttribute('id', 'sprint-cancel');
  sprintCancelBtn.textContent = 'НЕправильно';
  sprintButtonBlock.append(sprintCancelBtn);

  const answerVersions: Array<string> = [];
  answerVersions.push(currentItem.wordTranslate);
  for (let i = 0; i < 2; i++) {
    answerVersions.push(data[getRandomItem(data.length)].wordTranslate);
  }

  sprintWord.textContent = currentItem.word;
  sprintTranslation.textContent = answerVersions[getRandomItem(answerVersions.length)];

  sprintButtonBlock.onclick = function (event: Event) {
    const target = event.target;
    if ((target as HTMLButtonElement).id === 'sprint-submit') {
      if ((sprintTranslation as HTMLElement).textContent === currentItem.wordTranslate) {
        let currentSprintScore = Number(localStorage.getItem('sprintScore'));
        currentSprintScore++;
        localStorage.setItem('sprintScore', `${currentSprintScore}`);
        console.log(currentSprintScore);
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-check');
      } else {
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-xmark');
      }
      getSprintContent(level);
    }
    if ((target as HTMLButtonElement).id === 'sprint-cancel') {
      if ((sprintTranslation as HTMLElement).textContent !== currentItem.wordTranslate) {
        let currentSprintScore = Number(localStorage.getItem('sprintScore'));
        currentSprintScore++;
        localStorage.setItem('sprintScore', `${currentSprintScore}`);
        console.log(currentSprintScore);
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-check');
      } else {
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-xmark');
      }
      getSprintContent(level);
    }
  };
}

if (startSprint) {
  (startSprint as HTMLButtonElement).addEventListener('click', (e) => {
    (document.querySelector('.sprint-level') as HTMLElement).innerHTML = '';
    sprintInputs.forEach((input) => {
      if ((input as HTMLInputElement).checked) {
        level = Number(input.id);
        console.log(level);
      }
    });
    getSprintContent(level);
    if (level === 0) {
      setInterval(getSprintContent, 10000, level);
    }
    if (level === 1) {
      setInterval(getSprintContent, 9000, level);
    }
    if (level === 2) {
      setInterval(getSprintContent, 8000, level);
    }
    if (level === 3) {
      setInterval(getSprintContent, 7000, level);
    }
    if (level === 4) {
      setInterval(getSprintContent, 5000, level);
    }
    if (level === 5) {
      setInterval(getSprintContent, 3000, level);
    }
    console.log(level);
  });
}
