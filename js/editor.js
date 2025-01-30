// От editor.html
const editorMain = document.querySelector('.editor__main');
const table = document.createElement('table');
editorMain.appendChild(table);
table.classList.add('main__table')

setTable();

function setTable() {
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
}


