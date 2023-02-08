'use strict'

const titleContainer = document.getElementsByTagName('h1')[0];
const handlerBtn = document.getElementsByClassName('handler_btn');
const screenBtn = document.querySelector('.screen-btn'); 

const otherItemsProcent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');

const inputRange = document.querySelector('.rollback > .main-controls__range > [type="range"]');
const spanRange = document.querySelector('.rollback > .main-controls__range > .range-value');

const totalInput = document.getElementsByClassName('total-input');
let screenElem = document.querySelectorAll('.screen');  

console.log(titleContainer);
console.log(handlerBtn);
console.log(otherItemsProcent);
console.log(otherItemsNumber);
console.log(inputRange);
console.log(spanRange);

for (let i = 0; i < totalInput.length; i++) {
    console.log(totalInput[i]);
};

console.log(screenElem);