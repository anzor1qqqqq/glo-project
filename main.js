'use strict'

const title = 'glo-project';
const screens = 'Простые, Сложные, Интерактивные';
const screenPrice = 8;
const rollback = 99;
const fullPrice = 15000;
const adaptive = false;

console.log(typeof(title), typeof(fullPrice), typeof(adaptive));
console.log(screens.length);
console.log( `Стоимость верстки экранов ${screenPrice} рублей и Стоимость разработки сайта ${fullPrice} рублей`);

screens.toLowerCase();
const arr = screens.toLowerCase().split();
console.log(arr);

console.log((fullPrice * (rollback/100)));