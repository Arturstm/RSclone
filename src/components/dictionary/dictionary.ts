import '../../index.css';
import './dictionary.css';
import { chousenCards, CardObjects } from '../textbook/textbook';

const dictContent = document.querySelector('.dictionary-content');
if (dictContent) {
  (dictContent as HTMLElement).classList.add('dict-content');
}
const deleteItems: Array<string> = [];
let filteredChousenCards: Array<CardObjects> = [];
if (localStorage.getItem('chousen-cards')) {
  filteredChousenCards = JSON.parse(localStorage.getItem('chousen-cards') as string);
}
// код фильтра для массива обьектов взят отсюда: https://coderoad.ru/52339419/Javascript-массив-объектов-отфильтровать-по-уникальности-определенного-ключа-и#52339515
if (chousenCards) {
  const ids = new Set(chousenCards.map((e) => e.id));
  filteredChousenCards = chousenCards
    .filter((card) => ids.delete(card.id))
    .map((e) => {
      return { id: e.id, content: e.content };
    });
}
if (dictContent) {
  filteredChousenCards.forEach((item) => {
    const dictCard = document.createElement('div');
    dictCard.classList.add('dictCard');
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
    dictCard.onclick = function (event: Event) {
      const target = event.target;
      if ((target as HTMLInputElement).checked) {
        deleteItems.push((target as HTMLElement).id);
        if ((item.id = (target as HTMLElement).id)) {
          filteredChousenCards.splice(filteredChousenCards.indexOf(item), 1);
          localStorage.setItem('chousen-cards', JSON.stringify(filteredChousenCards));
        }
      }
      if ((target as HTMLElement).classList.contains('fa-volume-high')) {
        let isPlaying = false;
        if (isPlaying) {
          ((target as HTMLElement).previousElementSibling as HTMLAudioElement).pause();
          isPlaying = false;
        } else {
          ((target as HTMLElement).previousElementSibling as HTMLAudioElement).play();
          isPlaying = true;
        }
      }
    };
  });
}
