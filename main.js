'use strict'

const reg = /^\d+$/;

const appData = {
    start: function() {
        this.asking();
        this.logger();
    },

    title: '',
    screens: '',
    adaptive: true,
    screenPrice: 0,
    service1: '',
    servicePrice1: 0,
    service2: '',
    servicePrice2: 0,
    fullPrice: 0,

    asking: function() {
        this.title = prompt('Как называется ваш проект?');
        this.screens = prompt('Какие типы экранов нужно разработать?', 'Простые, Сложные, Интерактивные');
        this.adaptive = confirm('Нужен ли адаптив на сайте?');

        do {
            this.screenPrice = +prompt('Сколько будет стоить данная работа?', '12000');
        } while (false);

        this.service1 = prompt('Какой дополнительный тип услуги нужен?');
        this.servicePrice1 = prompt('Сколько это будет стоить?');

        while(!this.fooProgram.protectNum(this.servicePrice1)) {
            this.servicePrice1 = prompt('Сколько это будет стоить?');
        };

        this.service2 = prompt('Какой дополнительный тип услуги нужен?');
        this.servicePrice2 = prompt('Сколько это будет стоить?');

        while(!this.fooProgram.protectNum(this.servicePrice2)) {
            this.servicePrice2 = prompt('Сколько это будет стоить?');
        };



        this.fullPrice = this.fooProgram.getFullPrice(this.screenPrice, this.fooProgram.allServicePrices(+this.servicePrice1, +this.servicePrice2));

        switch (true) {
            case this.fullPrice > 30000:
                this.fullPrice -= this.fullPrice * 0.1;
                alert('Сумма заказа составила больше 30000 рублей, в связи с этим делаем вам скидку 10%');
                break;
            case this.fullPrice > 15000 && this.fullPrice < 30000:
                this.fullPrice -= this.fullPrice * 0.05;
                alert('Сумма заказа составила больше 15000 рублей, в связи с этим делаем вам скидку 5%');
                break;
            case this.fullPrice < 15000 && this.fullPrice > 0: 
                alert('Скидка не предусмотрена');
                break;
            case this.fullPrice <= 1000:
                alert('Что-то пошло не так');
                break;
            default:
                break;
        };

        this.fooProgram.getTitle();
        this.fooProgram.servicePercentPrice(); 
    },

    fooProgram: {
        protectNum: function(num) {
            return reg.test(num);
        },

        allServicePrices: function getAllServicePrices(a, b) {
            return Number(a + b);
        },

        getFullPrice: function(a, b) {
            return a + b;
        },

        getTitle: function() {
            if (appData.title)  {  
                appData.title = appData.title.trim();
                appData.title = appData.title[0].toUpperCase() + appData.title.slice(1).toLowerCase() ;
            };
        },

        servicePercentPrice: function getServicePercentPrices() {
            appData.fullPrice = Math.ceil(appData.fullPrice - (appData.fullPrice * 0.1));
        },
    },

    logger: function () {
        for (const key in appData) {
            console.log(appData[key]);
        };
    },
};   

appData.start();