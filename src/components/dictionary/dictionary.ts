import './dictionary.css';
import { chousenCards, CardObjects } from '../textbook/textbook';

const dictContent = document.querySelector('.dictionary-content');

// код фильтра для массива обьектов взят отсюда: https://coderoad.ru/52339419/Javascript-массив-объектов-отфильтровать-по-уникальности-определенного-ключа-и#52339515
const ids = new Set(chousenCards.map((e) => e.id));
const filteredChousenCards: Array<CardObjects> = chousenCards
  .filter((card) => ids.delete(card.id))
  .map((e) => {
    return { id: e.id, content: e.content };
  });

if (dictContent) {
  filteredChousenCards.forEach((item) => {
    const dictCard = document.createElement('div');
    const audioIcons = document.getElementsByClassName('fa-volume-high');
    dictCard.innerHTML = JSON.parse(item.content);
    dictContent.append(dictCard);
    const deleteFromDict = document.getElementsByClassName('chouse-checkbox');
    Array.from(deleteFromDict).forEach((checkbox) => {
      checkbox.classList.remove('chouse-checkbox');
      checkbox.classList.add('delete-checkbox');
    });
    const deleteFromDictLabels = document.getElementsByClassName('chouse-label');
    Array.from(deleteFromDictLabels).forEach((label) => {
      label.textContent = 'Отметить как выученное';
    });
    // Array.from(audioIcons).forEach((audioIcon) => {
    //   audioIcon.addEventListener('click', (e: Event) => {
    //     let isPlaying = false;
    //     if (isPlaying) {
    //       wordAudio.pause();
    //       isPlaying = false;
    //     } else {
    //       wordAudio.play();
    //       isPlaying = true;
    //     }
    //   });
    // })
  });
}
// filteredCards = stringifyCards.filter(function (item , pos) {
//   return chousenCards.indexOf(item) == pos;
// });
