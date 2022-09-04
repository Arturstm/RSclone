import '../../index.css';
import '../audio-challange/audio-challange.css';
import './sprint.css';
import { fetchData, ResponseItem } from '../textbook/textbook';
import { getRandomItem } from '../audio-challange/audio-challange';

const startSprint = document.querySelector('#start-sprint');
const sprintContent = document.querySelector('.sprint-content') as HTMLElement;
const sprintInputs = Array.from(document.getElementsByClassName('sprint-level__radio-btn'));
let level = 0;
let currentMistakes = 0;
let currentSprintScore = 0;
localStorage.setItem('sprintScore', `${currentSprintScore}`);
localStorage.setItem('sprintMistakes', `${currentMistakes}`);
let data: Array<ResponseItem> = [];
let sprintCorrectWords: Array<string> = [];
let sprintMistakes: Array<string> = [];
const continueBtn = document.createElement('button');
const finishBtn = document.createElement('button');
let counter = 60;
const counterSpan = document.createElement('span');
const sprintResultBlock = document.querySelector('.sprint-result') as HTMLElement;

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
  if (sprintContent) {
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
      if ((target as HTMLButtonElement).id === 'sprint-submit') {
        if ((sprintTranslation as HTMLElement).textContent === currentItem.wordTranslate) {
          currentSprintScore++;
          localStorage.setItem('sprintScore', `${currentSprintScore}`);
          sprintResultIcon.classList.add('fa-solid');
          sprintResultIcon.classList.add('fa-check');
          sprintCorrectWords.push(currentItem.word);
        } else {
          currentMistakes++;
          localStorage.setItem('sprintMistakes', `${currentMistakes}`);
          sprintResultIcon.classList.add('fa-solid');
          sprintResultIcon.classList.add('fa-xmark');
          sprintMistakes.push(currentItem.word);
        }
        getSprintContent(level);
      }
      if ((target as HTMLButtonElement).id === 'sprint-cancel') {
        if ((sprintTranslation as HTMLElement).textContent !== currentItem.wordTranslate) {
          currentSprintScore++;
          localStorage.setItem('sprintScore', `${currentSprintScore}`);
          sprintResultIcon.classList.add('fa-solid');
          sprintResultIcon.classList.add('fa-check');
          sprintCorrectWords.push(currentItem.word);
        } else {
          currentMistakes++;
          localStorage.setItem('sprintMistakes', `${currentMistakes}`);
          sprintResultIcon.classList.add('fa-solid');
          sprintResultIcon.classList.add('fa-xmark');
          sprintMistakes.push(currentItem.word);
        }
        getSprintContent(level);
      }
    };
  }
}

function shouResults() {
  sprintResultBlock.textContent = '';
  sprintContent.textContent = '';
  sprintContent.style.display = 'none';
  sprintResultBlock.style.display = 'flex';

  const resultMistakesBlock = document.createElement('div');
  resultMistakesBlock.classList.add('result-mistakes__block');
  const resultMistakes = document.createElement('p');
  resultMistakes.classList.add('sprint__result-mistakes');
  const mistakesIcon = document.createElement('i');
  mistakesIcon.classList.add('fa-solid');
  mistakesIcon.classList.add('fa-xmark');
  resultMistakes.textContent = `Ошибок: ${localStorage.getItem('sprintMistakes')}`;
  resultMistakesBlock.append(mistakesIcon);
  resultMistakesBlock.append(resultMistakes);
  sprintResultBlock.append(resultMistakesBlock);
  const mistakesList = document.createElement('ul');
  mistakesList.classList.add('sprint__mistakes-list');
  sprintResultBlock.append(mistakesList);
  sprintMistakes.forEach((word) => {
    const mistakesListItem = document.createElement('li');
    mistakesListItem.classList.add('mistakes-list__item');
    mistakesListItem.textContent = word;
    mistakesList.append(mistakesListItem);
  });
  const resultRightBlock = document.createElement('div');
  resultRightBlock.classList.add('result-right__block');
  const rightIcon = document.createElement('div');
  rightIcon.classList.add('fa-solid');
  rightIcon.classList.add('fa-check');
  const resultRight = document.createElement('p');
  resultRight.classList.add('sprint__result-right');
  resultRight.textContent = `Правильных ответов: ${localStorage.getItem('sprintScore')}`;
  sprintResultBlock.append(resultRightBlock);
  resultRightBlock.append(rightIcon);
  resultRightBlock.append(resultRight);
  const correctWordsList = document.createElement('ul');
  correctWordsList.classList.add('sprint__correct-words');
  sprintResultBlock.append(correctWordsList);
  sprintCorrectWords.forEach((word) => {
    const correctWordsListItem = document.createElement('li');
    correctWordsListItem.classList.add('correct-list__item');
    correctWordsListItem.textContent = word;
    correctWordsList.append(correctWordsListItem);
  });
  const resultBtnBlock = document.createElement('div');
  resultBtnBlock.classList.add('sprint__result-buttons');
  sprintResultBlock.append(resultBtnBlock);
  continueBtn.classList.add('btn');
  continueBtn.classList.add('btn-submit');
  continueBtn.textContent = 'Ещё раз';
  resultBtnBlock.append(continueBtn);
  finishBtn.classList.add('btn');
  finishBtn.classList.add('btn-cancel');
  finishBtn.textContent = 'Закончить игру';
  resultBtnBlock.append(finishBtn);
  (document.querySelector('.sprint-container') as HTMLElement).append(sprintResultBlock);
  localStorage.setItem('sprintScore', '0');
  localStorage.setItem('sprintMistakes', '0');
  currentMistakes = 0;
  currentSprintScore = 0;
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
    sprintContent.style.display = 'flex';
    (document.querySelector('.sprint-level') as HTMLElement).style.display = 'none';
    sprintTiming(level);
    countTime();
  });
}

if (continueBtn) {
  continueBtn.addEventListener('click', (e: Event) => {
    sprintContent.style.display = 'flex';
    sprintTiming(level);
    sprintContent.style.display = 'flex';
    sprintResultBlock.style.display = 'none';
    counter = 60;
    sprintContent.textContent = '';
    countTime();
  });
  finishBtn.addEventListener('click', (e: Event) => {
    location.reload();
  });
}
