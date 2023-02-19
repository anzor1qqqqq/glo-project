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

const cmsElem = document.querySelectorAll('.cms');
const cmsOpen = document.querySelector('#cms-open');
const cmsSelect = document.querySelector('#cms-select'); 
const mainControlsInput = document.querySelector('.hidden-cms-variants > .main-controls__input');
const inputCmsProcent = mainControlsInput.querySelector('#cms-other-input');

const customCheckbox = document.querySelectorAll('.custom-checkbox');

const appData = {
    title: '',
    adaptive: true,
    screens: [],
    servicesNumber: {},
    servicesProcent: {},
    rollback: 0,
    cmsProcent: {},
    servicesNumberPrice: 0,
    servicesProcentPrice: 0,
    ScreenPrice: 0,
    cmsProcentPrice: 0,
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
        this.addPrices = Math.ceil(this.fullPrice + (this.fullPrice * ((this.rollback + this.cmsProcentPrice)  / 100)));
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

            cmsElem.forEach(item => {
                if (cmsSelect.selectedIndex === 1) {
                    appData.cmsProcent[cmsSelect[cmsSelect.selectedIndex].textContent] = +cmsSelect[cmsSelect.selectedIndex].value;
                    appData.cmsProcentPrice = +cmsSelect[cmsSelect.selectedIndex].value;
                };

                if (cmsSelect.selectedIndex === 2) {
                    appData.cmsProcent[cmsSelect[cmsSelect.selectedIndex].textContent] = +inputCmsProcent.value;
                    appData.cmsProcentPrice = +inputCmsProcent.value;
                };
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
                document.querySelectorAll('[name="views-select"]').forEach(item => {
                    item.disabled = true;
                });

                document.querySelectorAll('[type="text"]').forEach(item => {
                    item.disabled = true;
                });

                customCheckbox.forEach(item => {
                    item.disabled = true;
                });

                startBtn.style.display = 'none';
                resetBtn.style.display = '';

                appData.fooProgram.addService();
                appData.asking();
                appData.fooProgram.showPrice();
            };

            screenBtn.disabled = true;
            inputRange.disabled = true;

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
            
            customCheckbox.forEach(item => {
                item.disabled = false;
                item.checked = false;
            });

            document.querySelectorAll('[name="views-select"]').forEach(item => {
                item.disabled = false;
            });

            document.querySelectorAll('[type="text"]').forEach(item => {
                item.disabled = false;
            });

            screenBtn.disabled = false;
            inputRange.disabled = false;

            startBtn.style.display = '';
            resetBtn.style.display = 'none';
            hiddenCmsVariants.style.display = 'none';

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

        cmsWork: () => {
            cmsOpen.addEventListener('input', () => {
                if (cmsOpen.checked === true) {
                    hiddenCmsVariants.style.display = 'flex';

                    cmsSelect.addEventListener('input', () => {
                        cmsSelect.selectedIndex === 2 ? mainControlsInput.style.display = 'flex' : mainControlsInput.style.display = 'none';
                    }); 
                } else {
                    hiddenCmsVariants.style.display = 'none';
                };

            });
        },

        init: function() {
            this.addTitle();
            this.rollbackInput();
            this.cmsWork();
            screenBtn.addEventListener('click', this.addinputScreen);
            startBtn.addEventListener('click', this.addScreen);
            resetBtn.addEventListener('click', this.reset);
        },
    },
};   

appData.start();

const Person = function(name, age, jobs) {
    this.name = name;
    this.age = age;
    this.jobs = jobs;
};

Person.prototype.showJobs = function() {
    console.log(`Я работаю в ${this.jobs}`);
};

const one = new Person('anzor', 21, 'OZON');

class Person1 {
    constructor(name, age, jobs) {
        this.name = name;
        this.age = age;
        this.jobs = jobs;
    };

    showJobs() {
        console.log(`Я работаю ${this.jobs}`);
    };
};

const two = new Person1('Vika', 23, 'OZON');

class Dev extends Person1 {
    constructor(name, age, jobs, arr = []) {
        super(name, age, jobs)
        this._arr = arr;
    };

    get arr() {
        return this._arr;
    };

    set arr(text) {
        this.arr.push(text);
    };
};

const three = new Dev('Jenya', 32, 'Tinkoff');
three.arr = 'beautifle';
three.arr = 'strong';


///////////////////

const obj = {
    name: 'anzor',
    age: 21,
    jobs: 'OZON',
};

/* function foo(name, age, jobs) {
    console.log(`Я ${name}, мне ${age}, работаю в ${jobs}`);   
};

foo(obj.jobs, obj.age,obj.name); */

/* function foo({age, jobs, name}) {
    console.log(`Я ${name}, мне ${age}, работаю в ${jobs}`);   
};

foo(obj); */

/////

let arr22 = [1, 2, 3, 3];
let arr222 = [4, 5, 6, 7];


console.log([...arr22], [...arr222]);