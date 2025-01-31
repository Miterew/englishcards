// От editor.html
const editorMain = document.querySelector('.editor__main');


setTable();

function setTable() {

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
        editWord(table)
    }

    console.log(words);
}


function editWord(table) {
    const tds = table.querySelectorAll('td');

    for (let td of tds) {


        td.addEventListener('click', function editCurrentTd() {
            this.removeEventListener('click', editCurrentTd);

            let savedText = this.textContent.trim();
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

                        setTimeout(() => {
                            table.remove();
                            setTable(); // Создаём новую таблицу уже с обновленными словами
                        }, 0);
                    }
                });
            }

        })


    }



}
