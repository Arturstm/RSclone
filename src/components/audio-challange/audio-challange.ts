import './audio-challange.css';
import { fetchData, url, ResponseItem } from '../textbook/textbook';
import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield';
// import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield';
const startChallange = document.querySelector('#start-challange');
const challangeContent = document.querySelector('.challange-content') as HTMLElement;
const challangeInputs = Array.from(document.getElementsByClassName('.challange-level__radio-btn'));
let level = 0;
let counter = 0;
let data: Array<ResponseItem> = [];
let correctWords: Array<string> = [];
let mistakes: Array<string> = [];
export function getRandomItem(max: number) {
  return Math.floor(Math.random() * max);
}
export function shuffle(array: Array<string>) {
  return array.sort(() => Math.random() - 0.5);
}
async function getChallangeContent(l: number) {
  const currentData: Array<ResponseItem> = [];
  for (let i = 0; i < 30; i++) {
    const dataFromOnePage = await fetchData(i, l);
    dataFromOnePage.forEach((item: ResponseItem) => {
      currentData.push(item);
    });
    data = currentData;
  }
  challangeContent.innerHTML = '';
  let currentItem = data[0];
  currentItem = data[getRandomItem(data.length)];
  const counterSpan = document.createElement('span');
  counterSpan.classList.add('challange__counter-span');
  counterSpan.textContent = `${20 - counter}`;
  challangeContent.append(counterSpan);
  const soundBlock = document.createElement('div');
  soundBlock.classList.add('challange__sound-block');
  const soundIcon = document.createElement('i');
  soundIcon.classList.add('fa-solid');
  soundIcon.classList.add('fa-volume-high');
  challangeContent.append(soundBlock);
  soundBlock.append(soundIcon);
  const challangeSound = document.createElement('audio');
  challangeSound.classList.add('challange__sound');
  soundBlock.append(challangeSound);
  const wordVersionsBlock = document.createElement('div');
  wordVersionsBlock.classList.add('challange__word-versions-block');
  const wordVersions = document.createElement('div');
  wordVersions.classList.add('challange__word-version');
  challangeContent.append(wordVersionsBlock);
  const answerVersions: Array<string> = [];
  answerVersions.push(currentItem.word);
  console.log(answerVersions);
  for (let i = 0; i < 4; i++) {
    answerVersions.push(data[getRandomItem(data.length)].word);
  }
  console.log(answerVersions);
  const shuffledVersions = shuffle(answerVersions);
  for (let i = 0; i <= 5; i++) {
    wordVersionsBlock.append(wordVersions.cloneNode(true));
    wordVersions.textContent = `${shuffledVersions[i]}`;
  }

  const nextBlock = document.createElement('div');
  nextBlock.classList.add('challange__next-block');
  challangeContent.append(nextBlock);
  const nextBtn = document.createElement('button');
  nextBtn.classList.add('btn');
  nextBtn.classList.add('btn-cancel');
  nextBtn.textContent = 'Не знаю';
  nextBlock.append(nextBtn);
  const answerBlock = document.createElement('div');
  answerBlock.classList.add('challange__answer-block');
  const challangeResultIcon = document.createElement('i');
  answerBlock.append(challangeResultIcon);
  const answerImg = document.createElement('img');
  answerImg.classList.add('challange__answer-img');
  answerBlock.append(answerImg);
  const answerWord = document.createElement('p');
  answerWord.classList.add('challange__answer-word');
  answerBlock.append(answerWord);
  const answerTranscription = document.createElement('p');
  answerTranscription.classList.add('challange__answer-transcription');
  answerBlock.append(answerTranscription);
  const answerTranslation = document.createElement('p');
  answerTranslation.classList.add('challange__answer-translation');
  answerBlock.append(answerTranslation);
  const resultBlock = document.createElement('div');
  resultBlock.classList.add('challange__result-block');
  const resultMistakes = document.createElement('p');
  resultMistakes.classList.add('challange__result-mistakes');
  resultBlock.append(resultMistakes);
  const mistakesList = document.createElement('ul');
  mistakesList.classList.add('challange__mistakes-list');
  resultBlock.append(mistakesList);
  const resultRight = document.createElement('p');
  resultRight.classList.add('challange__result-right');
  resultBlock.append(resultRight);
  const correctWordsList = document.createElement('ul');
  correctWordsList.classList.add('challange__correct-words');
  resultBlock.append(correctWordsList);
  const resultBtnBlock = document.createElement('div');
  resultBlock.classList.add('challange__result-buttons');
  resultBlock.append(resultBtnBlock);
  const continueBtn = document.createElement('button');
  continueBtn.classList.add('btn');
  continueBtn.classList.add('btn-submit');
  continueBtn.textContent = 'Ещё раз';
  resultBtnBlock.append(continueBtn);
  const finishBtn = document.createElement('button');
  finishBtn.classList.add('btn');
  finishBtn.classList.add('btn-cancel');
  finishBtn.textContent = 'Закончить игру';
  resultBtnBlock.append(finishBtn);

  challangeSound.setAttribute('src', `${url + currentItem.audio}`);
  answerWord.textContent = `${currentItem.word}`;
  answerTranscription.textContent = `${currentItem.transcription}`;
  answerTranslation.textContent = `${currentItem.wordTranslate}`;
  answerImg.setAttribute('src', `${url + currentItem.image}`);

  soundIcon.addEventListener('click', (e: Event) => {
    let isPlaying = false;
    if (isPlaying) {
      challangeSound.pause();
      isPlaying = false;
    } else {
      challangeSound.play();
      isPlaying = true;
    }
  });

  wordVersionsBlock.onclick = function (event: Event) {
    const target = event.target;
    if ((target as HTMLElement).classList.contains('challange__word-version')) {
      challangeContent.append(answerBlock);
      nextBtn.textContent = 'Дальше';
      nextBtn.classList.remove('btn-cancel');
      nextBtn.classList.add('btn-submit');
      if ((target as HTMLElement).textContent === (currentItem as ResponseItem).word) {
        let currentChallangeScore = Number(localStorage.getItem('audioChallangeScore'));
        currentChallangeScore++;
        localStorage.setItem('audioChallangeScore', `${currentChallangeScore}`);
        challangeResultIcon.classList.add('fa-solid');
        challangeResultIcon.classList.add('fa-check');
        correctWords.push(currentItem.word);
      } else {
        challangeResultIcon.classList.add('fa-solid');
        challangeResultIcon.classList.add('fa-xmark');
        mistakes.push(currentItem.word);
      }
      wordVersionsBlock.innerHTML = '';
    }
  };

  nextBtn.addEventListener('click', (e: Event) => {
    if (nextBtn.classList.contains('btn-cancel')) {
      challangeContent.append(answerBlock);
      wordVersionsBlock.innerHTML = '';
      nextBtn.textContent = 'Дальше';
      nextBtn.classList.remove('btn-cancel');
      nextBtn.classList.add('btn-submit');
      mistakes.push(currentItem.word);
    } else if (nextBtn.classList.contains('btn-submit')) {
      (nextBtn as HTMLButtonElement).disabled = true;
      counter++;
      if (counter < 20) {
        getChallangeContent(level);
      } else {
        challangeContent.innerHTML = '';
        resultRight.textContent = `Правильных ответов: ${localStorage.getItem('audioChallangeScore')}`;
        correctWords.forEach((word) => {
          const listItem = document.createElement('li');
          listItem.textContent = word;
          correctWordsList.append(listItem);
        });
        resultMistakes.textContent = `Ошибок: ${20 - Number(localStorage.getItem('audioChallangeScore'))}`;
        mistakes.forEach((word) => {
          const listItem = document.createElement('li');
          listItem.textContent = word;
          mistakesList.append(listItem);
        });
        challangeContent.append(resultBlock);
        counter = 0;
        localStorage.removeItem('audioChallangeScore');
        mistakes = [];
        correctWords = [];
      }
      console.log(counter);
    }
  });
  if (resultBtnBlock) {
    continueBtn.addEventListener('click', (e: Event) => {
      (continueBtn as HTMLButtonElement).disabled = true;
      getChallangeContent(level);
    });
    finishBtn.addEventListener('click', (e: Event) => {
      (finishBtn as HTMLButtonElement).disabled = true;
      location.reload();
    });
  }
}

if (startChallange) {
  (startChallange as HTMLButtonElement).addEventListener('click', (e) => {
    (startChallange as HTMLButtonElement).disabled = true;
    (document.querySelector('.challange-level') as HTMLElement).innerHTML = '';
    challangeInputs.forEach((input) => {
      if ((input as HTMLInputElement).checked) {
        level = Number(input.id);
      }
    });
    getChallangeContent(level);
  });
}