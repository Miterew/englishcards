// От index.html
const cardWord = document.querySelector('.card__word');
const cardImage = document.querySelector('.card__image');
const btnKnow = document.querySelector('.main__button--known');
const btnNo = document.querySelector('.main__button--learn');


// Проверяем первый ли запуск для загрузки сохраненных слов
function loadWords() {
    let str = localStorage.getItem('words'); // Пытаемся получить данные из хранилища

    if (str) {
        return JSON.parse(str);
    } else {
        console.log('Сохраненных слов нет, создаём новый список');

        const defaultWords = {
            adult: "взрослый",
            age: "возраст",
            baby: "малыш",
            birth: "рождение",
            boy: "мальчик",
            test: "test"
        };

        localStorage.setItem('words', JSON.stringify(defaultWords));
        return defaultWords;
    }
}

let words = loadWords();

// Объект и известными словами
const know = {};


let counter = 0;

getNewCard();

// Кнопка "ЗНАЮ"

// if сделано чтоб на других страницах не было ошибки если элемент отсутствует
if (btnKnow) {
    btnKnow.addEventListener('click', function setLearnWord() {
        this.removeEventListener('click', setLearnWord);

        let key = cardWord.textContent;
        let currentValue = words[key];

        know[key] = currentValue;
        localStorage.setItem('know', JSON.stringify(know));

        delete words[key];
        localStorage.setItem('words', JSON.stringify(words));

        counter--;
        getNewCard()
        this.addEventListener('click', setLearnWord);
    })
}


// Кнопка "НЕ ЗНАЮ"

// if сделано чтоб на других страницах не было ошибки если элемент отсутствует
if (btnNo) {
    btnNo.addEventListener('click', function getTimeLearn() {
        this.removeEventListener('click', getTimeLearn);

        let key = cardWord.textContent;
        let currentValue = words[key];
        cardWord.textContent += " | " + currentValue;;

        // даём время на изучение правильного ответа и врубаем некст
        setTimeout(function () {
            btnNo.addEventListener('click', getTimeLearn);
            getNewCard();
        }, 1000);
    });
};



function getNewCard() {
    let keys = Object.keys(words);

    let key = keys[counter];

    // сделано чтоб на других страницах не было ошибки если элемент отсутствует
    if (cardWord) {
        cardWord.textContent = key;

        cardImage.textContent = '';

        let image = document.createElement('img');
        image.src = 'img/' + keys[counter] + '.png';
        cardImage.appendChild(image);

        setNextIndex(keys, counter);
    }
}

function setNextIndex(arrKeys, index) {
    if (index === arrKeys.length) {
        alert("Мы прошли все слова, начнем с начала =)");

        counter = 0;
        return getNewCard()
    } else {
        console.log(index + 1 + " | " + arrKeys.length);
        counter++;
    }


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}