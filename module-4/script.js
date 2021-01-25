'use strict';

/*
  Создайте скрипт кассира, который получает список продуктов и деньги, 
  подсчитывает общую стоимость продуктов, и в зависимости от того хватает 
  денег или нет, уведомляет покупателя о результате.
*/

/* Есть база данных товаров, в формате "имя-товара":"цена за одну единицу" */
const products = {
    bread: 10,
    milk: 15,
    apples: 20,
    chicken: 50,
    cheese: 40,
  };
  
  /* 
    Необходимо создать функцию-конструктор Cashier.
    
    Поля будущего объекта кассира (🔔 объявляются как this.имя_поля в конструкторе): 
      - name - строка, имя кассира, передается при вызове конструктора
      
      - productsDatabase - объект база данных продуктов, передается при вызове конструктора
      
      - totalPrice - число, общая стоимость покупок текущего покупателя, всегда начинается с 0 
      
      - customerMoney - число, сумма введенная пользователем при запросе денег, всегда начинается с 0 
      
      - changeAmount - число, сдача, всегда начинается с 0
      
      - greet() - метод, выводит в консоль строку `Здравствуйте, вас обслуживает ${имя_кассира}`
      
      - onSuccess() - метод, выводит в консоль строку `Спасибо за покупку, ваша сдача ${сдача}` 
          если сдача больше 0, и строку `Спасибо за покупку` если сдача равна 0.
      
      - onError() - метод, выводит в консоль строку 'Очень жаль, вам не хватает денег на покупки'    
      
      - countTotalPrice(order) - метод, получает список покупок, считает общую стоимость исходя из 
          поля productsDatabase. Записывает результат в поле totalPrice.
        
      - getCustomerMoney(value) - метод, получает число - деньги покупателя и записывает его в поле customerMoney
          
      - countChange() - метод, считает сдачу, разницу между общей суммой покупок и деньгами покупателя, 
          записывает результат в поле changeAmount.
          * Обязательно проверьте что customerMoney не меньше чем значение поля totalPrice
          * Если денег было передано достаточно, возвращает текущее значение changeAmount
          * Если было передано меньше денег чем в поле totalPrice, возвращает null 
      
      - reset() - метод, сбрасывает поля totalPrice, customerMoney и changeAmount в 0.
  */

  /* Заказ пользователя хранится в виде объекта следующего формата. "имя-продукта":"количество-единиц" */
const order = {
    bread: 2,
    milk: 2,
    apples: 1,
    cheese: 1
  };

  const Cashier = function(name, productsDatabase ) {

    this.name = name;
    this.productsDatabase = productsDatabase;
    this.totalPrice = 0;
    this.customerMoney = 0;
    this.changeAmount = 0;

    this.greet = function() {
        console.log(`Здравствуйте, вас обслуживает ${this.name}`);
    }

    this.onSuccess = function() {
        const result = this.customerMoney - this.totalPrice > 0;

        if(result) {
            console.log(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
        } else {
            console.log('Спасибо за покупку');
        }
    }

    this.onError = function() {
        console.log('Очень жаль, вам не хватает денег на покупки');
    }

    this.countTotalPrice = function(order) {
        let productsDatabase = this.productsDatabase;
        let total = 0;

        for(const productUser in order) {
            for(const productData in productsDatabase) {
                if(productUser === productData) {
                    total += order[productUser] * productsDatabase[productData];
                }
            }
        }

        this.totalPrice = total;
    }

    this.getCustomerMoney = function(value) {
        this.customerMoney = value;
    }

    this.countChange = function() {
        if(this.customerMoney >= this.totalPrice) {
            return this.changeAmount = this.customerMoney - this.totalPrice;
        } else {
            return null;
        }
    }

    this.reset = function() {
        this.totalPrice = 0;
        this.customerMoney = 0;
        this.changeAmount = 0;
    }

  }
  

/* Пример использования */
const mango = new Cashier('Mango', products);

// // Проверяем исходные значения полей
// console.log(mango.name); // Mango
// console.log(mango.productsDatabase); // ссылка на базу данных продуктов (объект products)
// console.log(mango.totalPrice); // 0
// console.log(mango.customerMoney); // 0
// console.log(mango.changeAmount); // 0

// // Вызываем метод greet
// mango.greet(); // Здравствуйте, вас обслуживает Mango

// // Вызываем метод countTotalPrice для подсчета общей суммы
// // передавая order - список покупок пользователя

// mango.countTotalPrice(order);

// // Проверям что посчитали
// console.log('mango.totalPrice: ', mango.totalPrice); // 110

// // Вызываем getCustomerMoney для запроса денег покупателя
// mango.getCustomerMoney(120);

// // Проверяем что в поле с деньгами пользователя
// console.log(mango.customerMoney); // 300

// // Вызываем countChange для подсчета сдачи
// const result = mango.countChange();

// // Проверяем что нам вернул countChange
// console.log(result); // 190

// // Проверяем результат подсчета денег
// if (result !== null) {
  // При успешном обслуживании вызываем метод onSuccess
//   mango.onSuccess(); // Спасибо за покупку, ваша сдача 190
// } else {
  // При неудачном обслуживании вызываем метод onError   
//   mango.onError(); // Очень жаль, вам не хватает денег на покупки
// }

// Вызываем reset при любом исходе обслуживания
// mango.reset();

// // Проверяем значения полей после reset
// console.log(mango.totalPrice); // 0
// console.log(mango.customerMoney); // 0
// console.log(mango.changeAmount); // 0

//===============================================================================
// Реалізація через class

class CashierClass {
    constructor(name, productsDatabase) {
        this.name = name;
        this.productsDatabase = productsDatabase;
        this.totalPrice = 0;
        this.customerMoney = 0;
        this.changeAmount = 0;
    }

    greet() {
        console.log(`Здравствуйте, вас обслуживает ${this.name}`);
    }

    onSuccess() {
        const result = this.customerMoney - this.totalPrice > 0;

        if(result) {
            console.log(`Спасибо за покупку, ваша сдача ${this.changeAmount}`);
        } else {
            console.log('Спасибо за покупку');
        }
    }

    onError() {
        console.log('Очень жаль, вам не хватает денег на покупки');
    }

    countTotalPrice(order) {
        let productsDatabase = this.productsDatabase;
        let total = 0;

        for(const productUser in order) {
            for(const productData in productsDatabase) {
                if(productUser === productData) {
                    total += order[productUser] * productsDatabase[productData];
                }
            }
        }

        this.totalPrice = total;
    }

    getCustomerMoney(value) {
        this.customerMoney = value;
    }

    countChange() {
        if(this.customerMoney >= this.totalPrice) {
            return this.changeAmount = this.customerMoney - this.totalPrice;
        } else {
            return null;
        }
    }

    reset() {
        this.totalPrice = 0;
        this.customerMoney = 0;
        this.changeAmount = 0;
    }    
}

const order1 = {
    bread: 3,
    milk: 4,
    cheese: 1
  };

/* Пример использования */
const ajax = new CashierClass('Ajax', products);

// // Проверяем исходные значения полей
// console.log(ajax.name); // ajax
// console.log(ajax.productsDatabase); // ссылка на базу данных продуктов (объект products)
// console.log(ajax.totalPrice); // 0
// console.log(ajax.customerMoney); // 0
// console.log(ajax.changeAmount); // 0

// // Вызываем метод greet
// ajax.greet(); // Здравствуйте, вас обслуживает ajax

// Вызываем метод countTotalPrice для подсчета общей суммы
// // передавая order - список покупок пользователя

ajax.countTotalPrice('order1: ', order1);

// // Проверям что посчитали
console.log('ajax.totalPrice: ', ajax.totalPrice); // 130

// // Вызываем getCustomerMoney для запроса денег покупателя
// ajax.getCustomerMoney(200);

// // Проверяем что в поле с деньгами пользователя
// console.log(ajax.customerMoney); // 300

// // Вызываем countChange для подсчета сдачи
// const result = ajax.countChange();

// // Проверяем что нам вернул countChange
// console.log(result); // 190

// // Проверяем результат подсчета денег
// if (result !== null) {
// //   При успешном обслуживании вызываем метод onSuccess
//   ajax.onSuccess(); // Спасибо за покупку, ваша сдача 190
// } else {
// //   При неудачном обслуживании вызываем метод onError   
//   ajax.onError(); // Очень жаль, вам не хватает денег на покупки
// }

// Вызываем reset при любом исходе обслуживания
// ajax.reset();

// // Проверяем значения полей после reset
// console.log(ajax.totalPrice); // 0
// console.log(ajax.customerMoney); // 0
// console.log(ajax.changeAmount); // 0

