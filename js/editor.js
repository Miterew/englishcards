// От editor.html
const editorMain = document.querySelector('.editor__main');

const switchLearned = document.getElementById('learnedWordsSwitch');
const switchNeedLearn = document.getElementById('wordsSwitchNeedLearn');
const clearButton = document.getElementById('clear');
const divAddButton = document.querySelector('.editor__add_word');
const addWordButton = document.getElementById('add_word');

setTable();

function setTable() {

    loadWords();

    const table = document.createElement('table');
    editorMain.appendChild(table);
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
    console.log(words);
}


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

                        let newSavedWord = this.value; // сохраняем ввёденый текст
                        delete words[savedText];; // удаляем старое значение объекта

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
                            console.log('Сработало')
                            let newSavedWordTranslate = this.value;

                            words[newSavedWord] = newSavedWordTranslate;
                            table.remove();
                            setTable();
                        }
                    })


                    ////////////
                    // теперь при нажатии enter сохраняем новые свойства объекта
                    newInput.addEventListener('keypress', function saveNewWordTrans(e) {
                        if (e.key === 'Enter') {
                            console.log('Сработало');

                            let newSavedWordTranslate = this.value.trim(); // Убираем лишние пробелы
                            if (!newSavedWordTranslate) return; // Проверяем, чтобы не было пустых значений

                            words[newSavedWord] = newSavedWordTranslate; // Добавляем в объект слов

                            localStorage.setItem('words', JSON.stringify(words));

                            setTimeout(() => {
                                table.remove();
                                setTable(); // Создаём новую таблицу уже с обновленными словами
                            }, 0);
                        }
                    });
                }

            })
        }

        function remove() {
            let savedText = td.firstChild ? td.firstChild.textContent.trim() : ''; // Берём только текст слова
            delete words[savedText];

            localStorage.setItem('words', JSON.stringify(words));

            setTimeout(() => {
                table.remove();
                setTable(); // Создаём новую таблицу уже с обновленными словами
            }, 0);
        }



    }



};


// Доработать тут! НЕ РАБОТАЕТ НЕ РАБОТАЕТ
// addWordButton.addEventListener('click', () => {

//     let label = document.createElement('label');
//     label.textContent = 'Введите слово на английском и нажмите Enter';
    
//     let engWord = '';

//     let inputEn = document.createElement('input');
//     inputEn.addEventListener('keypress', function setEngWord(e) {
//         if (e.key === 'Enter') {
//             engWord = this.value; 
//             this.remove();
//         }
//     });

//     label.textContent = 'Введите слово на русском языке и нажмите Enter';
//     let ruWord = '';

//     let inputRu = document.createElement('input');
//     inputRu.addEventListener('keypress', function setEngWord(e) {
//         if (e.key === 'Enter') {
//             ruWord = this.value; 
//             this.remove();

//             console.log(words);
            
//             words[engWord] = ruWord;

//             console.log(words);

//             localStorage.setItem('words', JSON.stringify(words));


//             setTimeout(() => {
//                 label.textContent = 'Новое слово сохранено';
//                 label.remove();
//             }, 3000);

//         }
//     });
// });


clearButton.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
});

switchLearned.addEventListener('change', function () {
    if (this.checked) {
        console.log('Включили')
    } else {
        console.log('Выключили')
    }
});


switchNeedLearn.addEventListener('change', function () {
    if (this.checked) {
        console.log('Включили')
    } else {
        console.log('Выключили')
    }
});
