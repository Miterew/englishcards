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
        };

        localStorage.setItem('words', JSON.stringify(defaultWords));
        return defaultWords;
    }
}

let words = loadWords();

setLearnedWords();

// Проверяем если существует объект с известными словами или создаем новый
function setLearnedWords() {

    let know = localStorage.getItem('know');

    if(know) {
        return JSON.parse(know);
    } else {
        let newKnow = {}; // Создаем объект
        localStorage.setItem('know', JSON.stringify(newKnow)); // Сохраняем его в localStorage
        return newKnow;
    }
    
}



let counter = 0;

getNewCard();

// Кнопка "ЗНАЮ"

// if сделано чтоб на других страницах не было ошибки если элемент отсутствует
if (btnKnow) {
    btnKnow.addEventListener('click', function setLearnWord() {
        this.removeEventListener('click', setLearnWord);

        let key = cardWord.textContent;
        let currentValue = words[key];

        let know = setLearnedWords(); // Загружаем известные слова
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
    
    if (keys.length === 0) {
        alert("Все слова изучены!");
        return;
    }

    let key = keys[counter];

    if (cardWord) {
        cardWord.textContent = key || "Слов нет";
        cardImage.textContent = '';

        if (key) {
            let image = document.createElement('img');
            image.src = 'img/' + key + '.png';
            cardImage.appendChild(image);
        }

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