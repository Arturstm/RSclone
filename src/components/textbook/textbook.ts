import './textbook.css';
const url = 'https://rs-lang-179.herokuapp.com/';
let group = 0;
let page = 0;
let currentGroup: number;
let currentPage: number;
let currentPageNum: number;
const pageNumber = document.querySelector('.page-number') as HTMLElement;
interface ResponseItem {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const groupInputs = document.querySelector('.group-inputs') as HTMLElement;

async function fetchData(p: number, g: number) {
  try {
    const response: Response = await fetch(`${url}words?group=${g}&page=${p}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

async function reRenderData(p: number, g: number) {
  const data = await fetchData(p, g);
  (document.querySelector('.content') as HTMLElement).innerHTML = '';
  data.forEach((item: ResponseItem) => {
    const card = document.createElement('div');
    card.classList.add('card');
    const textBlock = document.createElement('div');
    textBlock.classList.add('text-block');
    const wordBlock = document.createElement('div');
    wordBlock.classList.add('word-block');
    const img = document.createElement('img');
    img.classList.add('img');
    const word = document.createElement('span');
    word.classList.add('word');
    const transcription = document.createElement('span');
    transcription.classList.add('transcription');
    const translation = document.createElement('span');
    translation.classList.add('translation');
    const audioIcon = document.createElement('i');
    audioIcon.classList.add('fa-solid');
    audioIcon.classList.add('fa-volume-high');
    const wordAudio = document.createElement('audio');
    wordAudio.classList.add('audio');
    const meanig = document.createElement('p');
    meanig.classList.add('meaning');
    const meaningAudio = document.createElement('audio');
    meaningAudio.setAttribute('controls', 'true');
    meaningAudio.classList.add('meaning-audio');
    const meaningTranslation = document.createElement('p');
    meaningTranslation.classList.add('meaning-translation');
    const example = document.createElement('p');
    example.classList.add('example');
    const exampleAudio = document.createElement('audio');
    exampleAudio.setAttribute('controls', 'true');
    exampleAudio.classList.add('example-audio');
    const exampleTranslation = document.createElement('p');
    exampleTranslation.classList.add('example-translation');
    const chouseCheckbox = document.createElement('input');
    chouseCheckbox.setAttribute('type', 'checkbox');
    chouseCheckbox.classList.add('chouse-checkbox');
    const chouseLabel = document.createElement('label');
    chouseLabel.textContent = 'Добавить в словарь';
    chouseLabel.classList.add('chouse-label');

    img.setAttribute('src', `${url + item.image}`);
    word.textContent = `${item.word}`;
    transcription.textContent = `${item.transcription}`;
    translation.textContent = `${item.wordTranslate}`;
    wordAudio.setAttribute('src', `${url + item.audio}`);
    meanig.innerHTML = `${item.textMeaning}`;
    example.innerHTML = `${item.textExample}`;
    meaningAudio.setAttribute('src', `${url + item.audioMeaning}`);
    exampleAudio.setAttribute('src', `${url + item.audioExample}`);
    meaningTranslation.textContent = `${item.textMeaningTranslate}`;
    exampleTranslation.textContent = `${item.textExampleTranslate}`;

    (document.querySelector('.content') as HTMLElement).append(card);
    chouseCheckbox.setAttribute('id', `${item.id}`);
    chouseLabel.setAttribute('id', `${item.id}`);

    card.append(img);
    card.append(textBlock);
    textBlock.append(wordBlock);
    wordBlock.append(word);
    wordBlock.append(transcription);
    wordBlock.append(translation);
    wordBlock.append(wordAudio);
    wordBlock.append(audioIcon);
    textBlock.append(meanig);
    textBlock.append(meaningTranslation);
    textBlock.append(meaningAudio);
    textBlock.append(example);
    textBlock.append(exampleTranslation);
    textBlock.append(exampleAudio);
    textBlock.append(chouseCheckbox);
    textBlock.append(chouseLabel);

    audioIcon.addEventListener('click', (e: Event) => {
      let isPlaying = false;
      if (isPlaying) {
        wordAudio.pause();
        isPlaying = false;
      } else {
        wordAudio.play();
        isPlaying = true;
      }
    });
  });
}

groupInputs.onclick = function (event: Event) {
  const target = event.target;
  group = Number((target as HTMLInputElement).id);
  localStorage.setItem('currentGroup', `${group}`);
  reRenderData(page, group);
};

function nextPage(p: number) {
  page = p;
  if (page < 29) {
    (prev as HTMLElement).style.display = 'inline';
    page++;
    pageNumber.innerHTML = (page + 1).toString();
    localStorage.setItem('currentPage', `${page}`);
    localStorage.setItem('currentPageNum', `${page + 1}`);
  } else {
    (next as HTMLElement).style.display = 'none';
  }
  reRenderData(page, group);
}

function prevPage(p: number) {
  page = p;
  if (page > 0) {
    page--;
    (next as HTMLElement).style.display = '';
    pageNumber.innerHTML = (page + 1).toString();
    localStorage.setItem('currentPage', `${page}`);
    localStorage.setItem('currentPageNum', `${page + 1}`);
  } else {
    (prev as HTMLElement).style.display = 'none';
  }
  reRenderData(page, group);
}

// page = currentPage;
// group = currentGroup;

// mongodb+srv://elf888888888:Vtr250_2002@cluster0.9zjrt5z.mongodb.net/?retryWrites=true&w=majority

// https://rs-lang-179.herokuapp.com/doc/

// var reloaded  = function(){...} //страницу перезагрузили
window.onload = function () {
  currentGroup = Number(localStorage.getItem('currentGroup'));
  currentPage = Number(localStorage.getItem('currentPage'));
  currentPageNum = Number(localStorage.getItem('currentPageNum'));
  pageNumber.innerHTML = currentPageNum.toString();
  page = currentPage;
  reRenderData(currentPage, currentGroup);
  Array.from(document.getElementsByClassName('group-input')).forEach((element) => {
    if (Number(element.id) === currentGroup) {
      element.setAttribute('checked', 'true');
    }
  });
  (prev as HTMLElement).addEventListener('click', () => prevPage(page));
  (next as HTMLElement).addEventListener('click', () => nextPage(page));
};
