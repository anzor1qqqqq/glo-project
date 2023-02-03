'use strict'

const title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
    adaptive = confirm('Нужен ли адаптив на сайте?'),
    screenPrice = prompt('Сколько будет стоить данная работа?', '12000');

let fullPrice = +screenPrice; 

switch (true) {
    case fullPrice > 30000:
        fullPrice -= fullPrice * 0.1;
        alert('Сумма заказа составила больше 30000 рублей, в связи с этим делаем вам скидку 10%');
        break;
    case fullPrice > 15000 && fullPrice < 30000:
        fullPrice -= fullPrice * 0.05;
        alert('Сумма заказа составила больше 15000 рублей, в связи с этим делаем вам скидку 5%');
        break;
    case fullPrice < 15000 && fullPrice > 0: 
        alert('Скидка не предусмотрена');
        break;
    case fullPrice <= 1000:
        alert('Что-то пошло не так');
        break;
    default:
        break;
}; 

const servicePercentPrice = Math.ceil(fullPrice - (fullPrice * 0.1));
console.log('servicePercentPrice: ', servicePercentPrice);