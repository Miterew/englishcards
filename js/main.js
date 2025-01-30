// От index.html
const cardWord = document.querySelector('.card__word');
const cardImage = document.querySelector('.card__image');
const btnKnow = document.querySelector('.main__button--known');
const btnNo = document.querySelector('.main__button--learn');




// Объект с полным списком слов
const words = {
    adult: "взрослый",
    age: "возраст",
    baby: "малыш",
    birth: "рождение",
    boy: "мальчик",

    test: 'test',
};

// Объект и известными словами
const know = {};


let counter = 0;

getNewCard();

// Кнопка "ЗНАЮ"
btnKnow.addEventListener('click', function setLearnWord() {
    this.removeEventListener('click', setLearnWord);

    let key = cardWord.textContent;
    let currentValue = words[key];

    know[key] = currentValue;

    delete words[key];

    counter--;
    getNewCard()
    this.addEventListener('click', setLearnWord);
})

// Кнопка "НЕ ЗНАЮ"
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
})



function getNewCard() {
    let keys = Object.keys(words);

    let key = keys[counter];
    cardWord.textContent = key;
    
    cardImage.textContent = '';

    let image = document.createElement('img');
    image.src = '/img/' + keys[counter] + '.png';
    cardImage.appendChild(image);

    setNextIndex(keys, counter);

    console.log('Вы знаете следующие слова:')
    console.log(know)
}

function setNextIndex (arrKeys, index) {
    if (index === arrKeys.length) {
        alert("Мы прошли все слова, начнем с начала =)");
        
        counter = 0;
        return getNewCard()
    } else {
        console.log(index + 1 + " | " + arrKeys.length );
        counter++;
    }


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}