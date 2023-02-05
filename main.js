'use strict'

let title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
    adaptive = confirm('Нужен ли адаптив на сайте?'),
    screenPrice = +prompt('Сколько будет стоить данная работа?', '12000'),
    
    service1 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice1 = +prompt('Сколько это будет стоить?'),
    service2 = prompt('Какой дополнительный тип услуги нужен?'),
    servicePrice2 = +prompt('Сколько это будет стоить?');

console.log('screens: ', screens);

const allServicePrices = function getAllServicePrices (a, b) {
    return a + b;
};

function getFullPrice(a, b) {
    return a + b;
};

let fullPrice = getFullPrice(screenPrice, allServicePrices(servicePrice1, servicePrice2));

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

function getTitle() {
    if (title)  {
        title = title.trim();
        console.log(title[0].toUpperCase() + title.slice(1).toLowerCase());
    };
};

const servicePercentPrice = function getServicePercentPrices() {
    return Math.ceil(fullPrice - (fullPrice * 0.1));
};

getTitle();
servicePercentPrice();

console.log('servicePercentPrice: ', servicePercentPrice());