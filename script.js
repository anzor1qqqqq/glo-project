'use strict'

const marketing = document.querySelector('.adv');
const bookElem = document.querySelectorAll('.book');
const booskContainer = document.querySelector('.books');
const titleBook = document.querySelectorAll('.book > h2 > a');

const chapterBook = document.querySelectorAll('.book > ul');
const bookTwo = chapterBook[0].querySelectorAll('li');
const bookFive = chapterBook[5].querySelectorAll('li');
const bookSix = chapterBook[2].querySelectorAll('li');

marketing.style.display = 'none';
document.body.style.backgroundImage = 'url(/image/you-dont-know-js.jpg)';
titleBook[4].textContent = 'Книга 3. this и Прототипы Объектов';

let reverseBook = () => {
    booskContainer.prepend(bookElem[2]);
    booskContainer.prepend(bookElem[5]);
    booskContainer.prepend(bookElem[3]);
    booskContainer.prepend(bookElem[4]);
    booskContainer.prepend(bookElem[0]);    
    booskContainer.prepend(bookElem[1]);    

    bookTwo[4].before(bookTwo[6]);
    bookTwo[4].before(bookTwo[8]);  
    bookTwo[9].after(bookTwo[2]);

    bookFive[4].after(bookFive[2]);
    bookFive[1].after(bookFive[9]);
    bookFive[8].before(bookFive[5]);

    bookSix[8].insertAdjacentHTML('beforeend', '<li>Глава 8: За пределами ES6</li>')
};

reverseBook();