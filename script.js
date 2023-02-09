'use strict'

const list = document.querySelectorAll('.list');
const elemLi = document.querySelectorAll('.elem');
const titleElem = document.querySelector('#title');

list[1].append(elemLi[0]);
list[1].append(elemLi[1]);

elemLi[0].replaceWith('jgjg');