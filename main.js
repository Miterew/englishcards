let cardWord = document.querySelector('.main__card');
const btnNo = document.querySelector('.main__button--learn');

const words = {
    adult: "взрослый",
    age: "возраст",
    baby: "малыш",
    birth: "рождение",
    boy: "мальчик",
    child: "ребенок",
    childhood: "детство",
    girl: "девочка",
    human: "человек",
    kid: "ребенок",
    life: "жизнь",
    man: "мужчина",
    name: "имя",
    people: "люди",
    person: "человек",
    personality: "личность",
    surname: "фамилия",
    teenager: "подросток",
    woman: "женщина",
    youth: "молодежь, молодость"
};

let counter = 0;
let keys = Object.keys(words);
getNewWord();


// Кнопка "НЕ ЗНАЮ"
btnNo.addEventListener('click', function getTimeLearn() {
    this.removeEventListener('click', getTimeLearn);

    let key = cardWord.textContent;
    let currentValue = words[key];
    cardWord.textContent += " | " + currentValue;;

    // даём время на изучение правильного ответа и врубаем некст
    setTimeout(function () {
        btnNo.addEventListener('click', getTimeLearn);
        getNewWord();
    }, 1000);
})



function getNewWord() {
    let key = keys[counter];
    cardWord.textContent = key;


    setNextIndex(keys, counter);
}

function setNextIndex (arrKeys, index) {
    if (index === arrKeys.length) {
        alert("Мы прошли все слова, начнем с начала =)");
        
        counter = 0;
        return getNewWord()
    } else {
        console.log(index + 1 + " | " + arrKeys.length );
        counter++;
    }


}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}