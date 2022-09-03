import './sprint.css';
import { fetchData, url, ResponseItem } from '../textbook/textbook';
import { getRandomItem, shuffle } from '../audio-challange/audio-challange';

const startSprint = document.querySelector('#start-sprint');
const sprintContent = document.querySelector('.sprint-content') as HTMLElement;
const sprintInputs = Array.from(document.getElementsByClassName('sprint-level__radio-btn'));
let level = 0;
let data: Array<ResponseItem> = [];
let sprintCorrectWords: Array<string> = [];
let sprintMistakes: Array<string> = [];
const continueBtn = document.createElement('button');
const finishBtn = document.createElement('button');
let counter = 60;
const counterSpan = document.createElement('span');

// код утилиты взят отсюда: https://stackoverflow.com/questions/37764665/how-to-implement-sleep-function-in-typescript
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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
  const counterBlock = document.createElement('div');
  counterBlock.classList.add('sprint__counter-block');
  counterBlock.append(counterSpan);
  sprintContent.append(counterBlock);
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
    (document.querySelector('#sprint-submit') as HTMLButtonElement).disabled = true;
    (document.querySelector('#sprint-cancel') as HTMLButtonElement).disabled = true;
    let currentMistakes = Number(localStorage.getItem('sprintMistakes'));
    let currentSprintScore = Number(localStorage.getItem('sprintScore'));
    if ((target as HTMLButtonElement).id === 'sprint-submit') {
      if ((sprintTranslation as HTMLElement).textContent === currentItem.wordTranslate) {
        currentSprintScore++;
        localStorage.setItem('sprintScore', `${currentSprintScore}`);

        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-check');
      } else {
        currentMistakes++;
        localStorage.setItem('sprintMistakes', `${currentMistakes}`);
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-xmark');
      }
      getSprintContent(level);
    }
    if ((target as HTMLButtonElement).id === 'sprint-cancel') {
      if ((sprintTranslation as HTMLElement).textContent !== currentItem.wordTranslate) {
        currentSprintScore++;
        localStorage.setItem('sprintScore', `${currentSprintScore}`);
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-check');
      } else {
        currentMistakes++;
        localStorage.setItem('sprintMistakes', `${currentMistakes}`);
        sprintResultIcon.classList.add('fa-solid');
        sprintResultIcon.classList.add('fa-xmark');
      }
      getSprintContent(level);
    }
  };

  return;
}

function shouResults() {
  sprintContent.innerHTML = '';
  const resultBlock = document.createElement('div');
  resultBlock.classList.add('sprint__result-block');
  const resultMistakes = document.createElement('p');
  resultMistakes.classList.add('sprint__result-mistakes');
  resultMistakes.textContent = `Ошибок: ${localStorage.getItem('sprintMistakes')}`;
  resultBlock.append(resultMistakes);
  const mistakesList = document.createElement('ul');
  mistakesList.classList.add('sprint__mistakes-list');
  resultBlock.append(mistakesList);
  const resultRight = document.createElement('p');
  resultRight.classList.add('sprint__result-right');
  resultRight.textContent = `Правильных ответов: ${localStorage.getItem('sprintScore')}`;
  resultBlock.append(resultRight);
  const correctWordsList = document.createElement('ul');
  correctWordsList.classList.add('sprint__correct-words');
  resultBlock.append(correctWordsList);
  const resultBtnBlock = document.createElement('div');
  resultBlock.classList.add('sprint__result-buttons');
  resultBlock.append(resultBtnBlock);
  continueBtn.classList.add('btn');
  continueBtn.classList.add('btn-submit');
  continueBtn.textContent = 'Ещё раз';
  resultBtnBlock.append(continueBtn);
  finishBtn.classList.add('btn');
  finishBtn.classList.add('btn-cancel');
  finishBtn.textContent = 'Закончить игру';
  resultBtnBlock.append(finishBtn);
  sprintContent.append(resultBlock);
  localStorage.removeItem('sprintScore');
  localStorage.removeItem('sprintMistakes');
  sprintMistakes = [];
  sprintCorrectWords = [];
}
async function countTime() {
  await getSprintContent(level);
  while (counter >= 0) {
    counterSpan.textContent = `${counter}`;
    await delay(1000);
    counter--;
  }
}

// код взят отсюда: https://qna.habr.com/q/1168740
async function sprintTiming(l: number) {
  await getSprintContent(l);
  await delay(61000);
  shouResults();
}

if (startSprint) {
  (startSprint as HTMLButtonElement).addEventListener('click', (e) => {
    (document.querySelector('.sprint-level') as HTMLElement).innerHTML = '';
    sprintInputs.forEach((input) => {
      if ((input as HTMLInputElement).checked) {
        level = Number(input.id);
      }
    });
    sprintTiming(level);
    countTime();
  });
}

if (continueBtn) {
  continueBtn.addEventListener('click', (e: Event) => {
    (continueBtn as HTMLButtonElement).disabled = true;
    sprintTiming(level);
    counter = 60;
    countTime();
  });
  finishBtn.addEventListener('click', (e: Event) => {
    (finishBtn as HTMLButtonElement).disabled = true;
    location.reload();
  });
}
