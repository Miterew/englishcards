// От editor.html
const pageTable = document.querySelector('.page__table');

const switchLearned = document.getElementById('learnedWordsSwitch');
const switchNeedLearn = document.getElementById('wordsSwitchNeedLearn');
const clearButton = document.getElementById('clear');
const divAddButton = document.querySelector('.editor__add_word');
const addWordButton = document.getElementById('add_word');
const wordShowList = document.querySelector('.words__show_list');
const wordPage = document.querySelector('.page__words');

setTable();

// Отрисовка таблицы
function setTable() {
    loadWords();

    const table = document.createElement('table');
    pageTable.appendChild(table);
    table.classList.add('main__table')


    let keys = Object.keys(words);
    let numberTrNeed;

    if (keys.length % 5 === 0) {
        numberTrNeed = keys.length / 5;
    } else {
        numberTrNeed = Math.ceil(keys.length / 5);
    }

    for (let i = 0; i < numberTrNeed; i++) {
        let tr = document.createElement('tr');
        tr.classList.add('table__tr')

        for (let y = 0; y < 5; y++) {
            let td = document.createElement('td');

            let wordIndex = i * 5 + y; // Правильный индекс слова
            td.textContent = keys[wordIndex] || ''; //  Заполняем пустыми ячейками, если слов меньше


            td.classList.add('table__td')

            tr.appendChild(td);
        }

        table.appendChild(tr);

    }
    menuWord(table);
}

// Перезагрузить таблицу редактирования слов (принцип DRY)
function reloadTable() {
    let oldTable = document.querySelector('.main__table');
    oldTable.remove();
    setTable();
}

// Действие со словом в таблице (редактировать / удалить)
function menuWord(table) {
    const tds = table.querySelectorAll('td');

    for (let td of tds) {

        td.addEventListener('click', function chooseMenuItem() {
            this.removeEventListener('click', chooseMenuItem);
            let br = document.createElement('br');
            let br2 = document.createElement('br');

            let editWord = document.createElement('a');
            editWord.textContent = 'Редактировать';
            td.appendChild(br);
            td.appendChild(editWord);

            editWord.addEventListener('click', edit);


            td.appendChild(br2);
            let removeWord = document.createElement('a');
            removeWord.textContent = 'Удалить';
            td.appendChild(removeWord);

            removeWord.addEventListener('click', remove);
        });

        function edit() {
            td.addEventListener('click', function editCurrentTd() {
                this.removeEventListener('click', editCurrentTd);

                let savedText = this.firstChild ? this.firstChild.textContent.trim() : ''; // Берём только текст слова
                let input = document.createElement('input');

                // если убрать setTimeOut то не успевает подставиться значение в инпут (багует)
                setTimeout(() => {
                    this.textContent = '';
                    input.value = savedText;
                    this.appendChild(input);
                    input.focus();
                }, 0);


                input.addEventListener('keypress', function (e) {
                    if (e.key === 'Enter') {

                        let newSavedWord = this.value.trim(); // сохраняем ввёденый текст
                        if (!newSavedWordTranslate) return; // эту защиту подсказал GPT

                        if (words[newSavedWord]) {      // эту защиту подсказал GPT
                            alert("Такое слово уже есть в списке!");
                            return;
                        }

                        delete words[savedText]; // удаляем старое значение объекта

                        this.remove();

                        saveNewObjectParms(newSavedWord);
                    }
                })

                function saveNewObjectParms(newSavedWord) {

                    let newInput = document.createElement('input');
                    td.appendChild(newInput);
                    newInput.value = 'Введите перевод слова';

                    newInput.addEventListener('click', function clickClear() {
                        this.value = '';
                        this.focus();
                    })

                    // теперь при нажатии enter сохраняем новые свойства объекта
                    newInput.addEventListener('keypress', function saveNewWordTrans(e) {
                        this.removeEventListener('keypress', saveNewWordTrans);

                        if (e.key === 'Enter') {
                            let newSavedWordTranslate = this.value;

                            words[newSavedWord] = newSavedWordTranslate;

                            reloadTable()
                        }
                    })


                    ////////////
                    // теперь при нажатии enter сохраняем новые свойства объекта
                    newInput.addEventListener('keypress', function saveNewWordTrans(e) {
                        if (e.key === 'Enter') {

                            let newSavedWordTranslate = this.value.trim(); // Убираем лишние пробелы
                            if (!newSavedWordTranslate) return; // Проверяем, чтобы не было пустых значений

                            words[newSavedWord] = newSavedWordTranslate; // Добавляем в объект слов

                            localStorage.setItem('words', JSON.stringify(words));

                            reloadTable()
                        }
                    });
                }

            })
        }

        function remove() {
            let savedText = td.firstChild ? td.firstChild.textContent.trim() : ''; // Берём только текст слова
            delete words[savedText];

            localStorage.setItem('words', JSON.stringify(words));

            reloadTable()
        }



    }



};


// Кнопка добавление слова
addWordButton.addEventListener('click', () => {

    let inputEn = document.createElement('input');
    inputEn.value = 'Слово на англ и enter';
    addWordButton.parentElement.prepend(inputEn);



    let engWord = '';

    inputEn.addEventListener('click', () => {
        inputEn.value = '';
    })

    inputEn.addEventListener('keypress', function setEngWord(e) {
        if (e.key === 'Enter') {
            engWord = this.value;
            this.remove();

            getRuWord()
        }
    });

    function getRuWord() {
        let inputRu = document.createElement('input');
        inputRu.value = 'Перевод слова и enter';
        addWordButton.parentElement.prepend(inputRu);

        let ruWord = '';

        inputRu.addEventListener('click', () => {
            inputRu.value = '';
        })

        inputRu.addEventListener('keypress', function setRuWord(e) {
            if (e.key === 'Enter') {
                ruWord = this.value;
                this.remove();

                words[engWord] = ruWord;

                localStorage.setItem('words', JSON.stringify(words));


                reloadTable()

            }
        });
    }



});


// Кнопка очистки локального хранилища
clearButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();

});

switchLearned.addEventListener('change', function () {
    wordShowList.textContent = '';
    if (this.checked) {
        switchNeedLearn.checked = false;

        let oldKnow = localStorage.getItem('know'); // Пытаемся получить данные из хранилища
        let objKnow = JSON.parse(oldKnow);
        
        // если объект импортировался успешно
        if (objKnow) {
            let knowKeys = Object.keys(objKnow);
            let knowValues = Object.values(objKnow);

            localStorage.setItem('know', JSON.stringify(objKnow));

            for (let i = 0; i < knowKeys.length; i++) {

                wordShowList.textContent += knowKeys[i] + ' - ' + knowValues[i] + ' | ';
                console.log(wordShowList.textContent)
            }

        }

        wordShowList.classList.add('words__show_list-enable');
        // Выдаем "Пусто" если нет сохранных слов
        if (!wordShowList.textContent) {
            wordShowList.textContent = 'Пусто';
        }

    } else {
        wordShowList.textContent = '';
        wordShowList.classList.remove('words__show_list-enable');

    }
});


// Осталось дописать функцию которая будет подставлять текст подобно той что выше

switchNeedLearn.addEventListener('change', function () {
    wordShowList.textContent = '';

    if (this.checked) {
        switchLearned.checked = false;

        let wordsStr = localStorage.getItem('words'); // Загружаем слова, которые нужно выучить
        let wordsObj = JSON.parse(wordsStr);

        if (wordsObj) {
            let wordsKeys = Object.keys(wordsObj);
            let wordsValues = Object.values(wordsObj);

            for (let i = 0; i < wordsKeys.length; i++) {
                wordShowList.textContent += wordsKeys[i] + ' - ' + wordsValues[i] + ' | ';
            }
        }

        // Выдаем "Пусто", если нет слов для изучения
        if (!wordShowList.textContent) {
            wordShowList.textContent = 'Пусто';
        }

        wordShowList.classList.add('words__show_list-enable');
    } else {
        wordShowList.textContent = '';
        wordShowList.classList.remove('words__show_list-enable');
    }
});
