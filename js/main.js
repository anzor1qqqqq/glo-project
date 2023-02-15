'use strict'

const titleContainer = document.getElementsByTagName('h1')[0];
const screenBtn = document.querySelector('.screen-btn'); 

const otherItemsProcent = document.querySelectorAll('.other-items.percent');
const otherItemsNumber = document.querySelectorAll('.other-items.number');
const hiddenCmsVariants = document.querySelector('.hidden-cms-variants');

const inputRange = document.querySelector('.rollback > .main-controls__range > [type="range"]');
const spanRange = document.querySelector('.rollback > .main-controls__range > .range-value');

const startBtn = document.getElementsByClassName('handler_btn')[0];
const resetBtn = document.getElementsByClassName('handler_btn')[1];
 
const totalInputPrice = document.getElementsByClassName('total-input')[0];
const totalInputQuanty = document.getElementsByClassName('total-input')[1];
const totalInputAddPrice = document.getElementsByClassName('total-input')[2];
const totalInputFullPrice = document.getElementsByClassName('total-input')[3];
const totalInputFullPricePercent = document.getElementsByClassName('total-input')[4];

let screenElem = document.querySelectorAll('.screen');
let protect;

const appData = {
    title: '',
    adaptive: true,
    screens: [],
    servicesNumber: {},
    servicesProcent: {},
    rollback: 0,
    servicesNumberPrice: 0,
    servicesProcentPrice: 0,
    ScreenPrice: 0,
    fullPrice: 0,
    addPrices : 0,

    start: function() {
        this.fooProgram.init();
    },

    asking: function() {
        for (let key of this.screens) {
            this.ScreenPrice += key.price;
        };

        for (let key in this.servicesNumber) {
            this.servicesNumberPrice += this.servicesNumber[key];
        };

        for (let key in this.servicesProcent) {
            this.servicesProcentPrice += this.ScreenPrice * (this.servicesProcent[key] / 100);
        };

        this.fullPrice = this.servicesProcentPrice + this.servicesNumberPrice + this.ScreenPrice;
        this.addPrices  = Math.ceil(this.fullPrice + (this.fullPrice * (this.rollback / 100)));
    },

    fooProgram: {
        addTitle: () => {
            document.title = titleContainer.textContent;
        },

        showPrice: () => {
            totalInputQuanty.value = appData.screens.reduce((elem, index) => {
                return elem + index.count;
            }, 0);

            totalInputPrice.value = appData.ScreenPrice;
            totalInputAddPrice.value = appData.servicesProcentPrice + appData.servicesNumberPrice;
            totalInputFullPrice.value = appData.fullPrice;  
            totalInputFullPricePercent.value = appData.addPrices;
        },

        addService: () => {
            otherItemsProcent.forEach(item => {
                const serviceProcentText = item.querySelector('label').textContent;
                const checkboxBtn = item.querySelector('[type="checkbox"]');
                const priceServiceProcent = item.querySelector('.main-controls__input > [type = "text"]').value;
                
                if (checkboxBtn.checked) appData.servicesProcent[serviceProcentText] = +priceServiceProcent;
            });

            otherItemsNumber.forEach(item => {
                const serviceNumberText = item.querySelector('label').textContent;
                const checkboxBtn = item.querySelector('[type="checkbox"]');
                const priceServiceNumber = item.querySelector('.main-controls__input > [type = "text"]').value;
                
                if (checkboxBtn.checked) appData.servicesNumber[serviceNumberText] = +priceServiceNumber;
            });
        },

        addinputScreen: () => {
            const screenCloneElem = screenElem[0].cloneNode(true);

            if (screenElem.length !== 7) screenElem[screenElem.length - 1].after(screenCloneElem);

            screenElem = document.querySelectorAll('.screen');
        },

        rollbackInput: () => {
            inputRange.addEventListener('input', event => {
                spanRange.textContent = event.target.value + '%';
            }); 

            inputRange.addEventListener('change', () => {
                appData.rollback = parseInt(spanRange.textContent);
            }); 
        },

        Fooprotect: (a, b, c) => {
            for (let i = 0; i < c.length; i++) {
                if (b[i].value !== '' && a[i].selectedIndex !== 0) {
                    protect = true;
                }  else {
                    protect = false;
                    break;
                };
            };
        },

        addScreen: () => {
            screenElem.forEach((item, index) => {
                const nameScreen = item.querySelectorAll('[name="views-select"] > option')[item.querySelector('[name="views-select"]').selectedIndex];
                const priceScreen = item.querySelectorAll('[name="views-select"] > option')[item.querySelector('[name="views-select"]').selectedIndex];
                const quantyScreen = item.querySelector('[type="text"]');

                const protectElemText = document.querySelectorAll('.main-controls__select > .views_select_screen');
                const protectElemNumber = document.querySelectorAll('[type="text"]');

                appData.fooProgram.Fooprotect(protectElemText, protectElemNumber, screenElem);

                if (protect === true) {
                    appData.screens.push({
                        id: index,
                        name: nameScreen.textContent, 
                        price: +priceScreen.value * +quantyScreen.value,
                        count: +quantyScreen.value,
                    });
                };
            });

            if (protect === true) {
                screenElem.forEach(item => {
                    item.querySelector('select').disabled = true;
                    item.querySelector('input').disabled = true;
                });

                startBtn.style.display = 'none';
                resetBtn.style.display = '';

                appData.fooProgram.addService();
                appData.asking();
                appData.fooProgram.showPrice();
            };

            appData.screens = [];
            appData.servicesNumber = {};
            appData.servicesProcent = {};
            appData.rollback = 0;
            appData.servicesNumberPrice = 0;
            appData.servicesProcentPrice = 0;
            appData.ScreenPrice = 0;
            appData.fullPrice = 0;
            appData.addPrices  = 0;
        },

        reset: () => {
            let copyElem = screenElem[0];
            
            screenElem.forEach(item => {
                item.remove();
            });

            screenElem.forEach(item => {
                const select = item.querySelector('select')
                const input = item.querySelector('input');

                select.disabled = false;
                input.disabled = false;

                screenBtn.before(copyElem);

                select.selectedIndex = 0;
                input.value = '';
            });

            document.querySelectorAll('.custom-checkbox').forEach(item => {
                item.checked = false;
            });

            startBtn.style.display = '';
            resetBtn.style.display = 'none';

            appData.screens = [];
            appData.servicesNumber = {};
            appData.servicesProcent = {};
            appData.rollback = 0;
            appData.servicesNumberPrice = 0;
            appData.servicesProcentPrice = 0;
            appData.ScreenPrice = 0;
            appData.fullPrice = 0;
            appData.addPrices  = 0;

            totalInputPrice.value = 0;
            totalInputAddPrice.value = 0;
            totalInputFullPrice.value = 0;  
            totalInputFullPricePercent.value = 0;
            totalInputQuanty.value = 0;

            spanRange.textContent = '0%';
            inputRange.value = 0;
            
        },

        init: function() {
            this.addTitle();
            this.rollbackInput();
            screenBtn.addEventListener('click', this.addinputScreen);
            startBtn.addEventListener('click', this.addScreen);
            resetBtn.addEventListener('click', this.reset)
        },
    },
};   

appData.start();