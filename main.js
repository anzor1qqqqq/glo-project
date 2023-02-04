'use strict'

const service1 = 1500;
const service2 = 1900;
let title = prompt('Как называется ваш проект?'),
    screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные'),
    adaptive = confirm('Нужен ли адаптив на сайте?'),
    screenPrice = prompt('Сколько будет стоить данная работа?', '12000');

const allServicePrices = function getAllServicePrices (a, b) {
    return a + b;
};

function getFullPrice(a, b) {
    return a + b;
};

const fullPrice = getFullPrice(+screenPrice, allServicePrices(service1, service2));
console.log('fullPrice: ', fullPrice);

function getTitle() {
    if (title)  {
        title = title.trim();
        document.title = title[0].toUpperCase() + title.slice(1).toLowerCase(); 
    }
};
getTitle()


const servicePercentPrice = function getServicePercentPrices() {
    
};
