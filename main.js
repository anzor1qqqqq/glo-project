'use strict'

const reg = /^\d+$/;

const appData = {
    start: function() {
        this.asking();
        this.logger();
    },

    title: '',
    screens: [],
    adaptive: true,
    services: {},
    fullPrice: 0,

    asking: function() {
        let screenPrice;
        let servicePrice;

        this.title = prompt('Как называется ваш проект?');

        while (!isNaN(this.title.trim())) {
            this.title = prompt('Как называется ваш проект?');  
        }; 

        for (let i = 0; i < 2; i++) {
            let screenInfo = prompt('Какие типы экранов нужно разработать?');

            while (!isNaN(screenInfo.trim())) {
                screenInfo = prompt('Какие типы экранов нужно разработать?');
            };

            screenPrice = prompt('Сколько будет стоить данная работа?');

            while (!this.fooProgram.protectNum(screenPrice)) {
                screenPrice = prompt('Сколько будет стоить данная работа?');
            };

            this.screens.push({name: screenInfo, price: screenPrice});
        };

        this.adaptive = confirm('Нужен ли адаптив на сайте?');

        do {
            screenPrice = prompt('Сколько будет стоить данная работа?', '12000');
        } while (!this.fooProgram.protectNum(screenPrice));
        
        for (let i = 0; i < 2; i++) {
            let service = prompt('Какой дополнительный тип услуги нужен?');

            while (!isNaN(service.trim())) {
                service = prompt('Какой дополнительный тип услуги нужен?');
            };

            servicePrice = prompt('Сколько это будет стоить?');

            while (!this.fooProgram.protectNum(servicePrice)) {
                servicePrice = prompt('Сколько это будет стоить?');
            };   

            this.services[service] = servicePrice;
        };

        screenPrice = this.screens.reduce((elem, item) => {
            return elem + +item.price;
        }, 0);


        for (let key in this.services) {
            servicePrice += +this.services[key];
        };

        this.fullPrice = this.fooProgram.getFullPrice(screenPrice, servicePrice);

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