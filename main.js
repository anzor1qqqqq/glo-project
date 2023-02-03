'use strict'

const title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
    screenPrice = prompt('Сколько будет стоить данная работа?', '12000'),
    adaptive = confirm('Нужен ли адаптив на сайте?');

let service1 = confirm('Нужно создать макет сайта?(10000)');
service1 = service1 ? 10000 : 0;

let service2 = confirm('Подключить платежную систему?(12000)');
service2 = service2 ? 12000 : 0;

let fullPrice = +screenPrice + service1 + service2; 

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

const servicePercentPrice = Math.ceil(fullPrice - 1000);
console.log('servicePercentPrice: ', servicePercentPrice);