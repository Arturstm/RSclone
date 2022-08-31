import './audio-challange.css';
import { fetchData, url, ResponseItem } from '../textbook/textbook';
import { MDCTextFieldCharacterCounterFoundation } from '@material/textfield';
const startChallange = document.querySelector('#start-challange');
const challangeContent = document.querySelector('.challange-content') as HTMLElement;
const challangeInputs = document.querySelector('.challange-level__inputs');
let level = 0;
let data: Array<ResponseItem> = [];
export function getRandomItem(max: number) {
  return Math.floor(Math.random() * max);
}
export function shuffle(array: Array<string>) {
  return array.sort(() => Math.random() - 0.5);
}
async function getChallangeContent(l: number) {
  for (let i = 0; i < 30; i++) {
    const dataFromOnePage = await fetchData(i, l);
    dataFromOnePage.forEach((item: ResponseItem) => {
      data.push(item);
    });
  }
  challangeContent.innerHTML = '';
  let currentItem = null;
  currentItem = data[getRandomItem(data.length)];
  const soundBlock = document.createElement('div');
  soundBlock.classList.add('challanege__sound-block');
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
  for (let i = 0; i <= 4; i++) {
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
        console.log(currentChallangeScore);
      } else {
        challangeResultIcon.classList.add('fa-solid');
        challangeResultIcon.classList.add('fa-xmark');
      }
      wordVersionsBlock.innerHTML = '';
    }
  };

  nextBtn.addEventListener('click', (e: Event) => {
    if (nextBtn.classList.contains('btn-cancel')) {
      challangeContent.append(answerBlock);
      nextBtn.textContent = 'Дальше';
      nextBtn.classList.remove('btn-cancel');
      nextBtn.classList.add('btn-submit');
    } else getChallangeContent(level);
  });
  challangeSound.setAttribute('src', `${url + currentItem.audio}`);
  answerWord.textContent = `${currentItem.word}`;
  answerTranscription.textContent = `${currentItem.transcription}`;
  answerTranslation.textContent = `${currentItem.wordTranslate}`;
  answerImg.setAttribute('src', `${url + currentItem.image}`);
  console.log(data);
}

if (challangeInputs) {
  (challangeInputs as HTMLElement).onclick = function (event: Event) {
    const target = event.target;
    level = Number((target as HTMLInputElement).id);
    // localStorage.setItem('currentLevel', `${level}`);
    getChallangeContent(level);
  };
}

if (startChallange) {
  (startChallange as HTMLButtonElement).addEventListener('click', (e) => {
    (document.querySelector('.challange-level') as HTMLElement).innerHTML = '';
    getChallangeContent(level);
  });
}
