const url = 'https://rs-lang-179.herokuapp.com/';
let group: number = 0;
let page: number = 0;
interface responseItem {  
        id: string,
        group: number,
        page: number
        word: string,
        image: string,
        audio: string,
        audioMeaning: string,
        audioExample: string,
        textMeaning: string,
        textExample: string,
        transcription: string,
        wordTranslate: string,
        textMeaningTranslate: string,
        textExampleTranslate: string  
}

const next = document.querySelector('#next');
const prev = document.querySelector('#prev');

const groupInputs = document.querySelector('.group-inputs');

function nextPage() {
    if (page < 29) {
        (prev as HTMLElement).style.display = 'inline'
        page++
    }
    else {
        (next as HTMLElement).style.display = 'none'
    }
    reRenderData(page, group)
};

function prevPage() {
    if (page > 0) {
        page--
        (next as HTMLElement).style.display = '';
    }
    else {
        (prev as HTMLElement).style.display = 'none';
    }
    reRenderData(page, group)
};

(prev as HTMLElement).addEventListener('click', prevPage);
(next as HTMLElement).addEventListener('click', nextPage);

(groupInputs as HTMLElement).onclick = function (event: Event) {
    let target = event.target;
    group = Number((target as HTMLInputElement).id);
    reRenderData(page, group)
};

async function fetchData(page: number, group: number) {
    try {
        let response: Response = await fetch(`${url}words?group=${group}&page=${page}`);
        return await response.json();
    }
    catch (error) {
        console.log(error);
    }
}

async function reRenderData(page: number, group: number) {
    let data = await fetchData(page, group);
    (document.querySelector('.content') as HTMLElement).innerHTML = '';
    data.forEach((item: responseItem) => {
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
        wordAudio.setAttribute('src', `${url + item.audio}`)
        meanig.innerHTML = `${item.textMeaning}`;
        example.innerHTML = `${item.textExample}`;
        meaningAudio.setAttribute('src', `${url + item.audioMeaning}`)
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
        textBlock.append(exampleAudio)
        textBlock.append(chouseCheckbox);
        textBlock.append(chouseLabel);

        audioIcon.addEventListener('click', (e: Event) => {
            let isPlaying = false;
            if (isPlaying) {
                wordAudio.pause();
                isPlaying = false;
            }
            else {
                wordAudio.play();
                isPlaying = true;
            }
        });
    })

}
reRenderData(page, group)


// mongodb+srv://elf888888888:Vtr250_2002@cluster0.9zjrt5z.mongodb.net/?retryWrites=true&w=majority

// https://rs-lang-179.herokuapp.com/doc/
