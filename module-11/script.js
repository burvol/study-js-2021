
/*
  Реализуйте форму фильтра товаров в каталоге и список отфильтрованных товаров.
  Используйте шаблонизацию для создания карточек товаров.
  
  Есть массив объектов (дальше в задании), каждый из которых описывает 
  ноутбук с определенными характеристиками.
  
  Поля объекта по которым необходимо производить фильтрацию: size, color, release_date.
  Поля объекта для отображения в карточке: name, img, descr, color, price, release_date.
    
  Изначально есть форма с 3-мя секциями, состоящими из заголовка и группы 
  чекбоксов (разметка дальше в задании). После того как пользователь выбрал 
  какие либо чекбоксы и нажал кнопку Filter, необходимо собрать значения чекбоксов по группам. 
  
  🔔 Подсказка: составьте объект формата
      const filter = { size: [], color: [], release_date: [] }
    
  После чего выберите из массива только те объекты, которые подходят 
  под выбраные пользователем критерии и отрендерите список карточек товаров.
  
  🔔 Каждый раз когда пользователь фильтрует товары, список карточек товаров очищается, 
      после чего в нем рендерятся новые карточки товаров, соответствующих текущим критериям фильтра.
*/


const laptops = [
  {
    size: 13,
    color: 'white',
    price: 28000,
    release_date: 2015,
    name: 'Macbook Air White 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'gray',
    price: 32000,
    release_date: 2016,
    name: 'Macbook Air Gray 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 13,
    color: 'black',
    price: 35000,
    release_date: 2017,
    name: 'Macbook Air Black 13"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'white',
    price: 45000,
    release_date: 2015,
    name: 'Macbook Air White 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'gray',
    price: 55000,
    release_date: 2016,
    name: 'Macbook Pro Gray 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 15,
    color: 'black',
    price: 45000,
    release_date: 2017,
    name: 'Macbook Pro Black 15"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'white',
    price: 65000,
    release_date: 2015,
    name: 'Macbook Air White 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'gray',
    price: 75000,
    release_date: 2016,
    name: 'Macbook Pro Gray 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
  {
    size: 17,
    color: 'black',
    price: 80000,
    release_date: 2017,
    name: 'Macbook Pro Black 17"',
    img: 'http://demo.posthemes.com/pos_zadademo/images/placeholder.png',
    descr:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, beatae.',
  },
];

const list = document.querySelector('.cards');
const cards = list.querySelectorAll('li.card');
const form = document.querySelector('.form.js-form');

const source = document.querySelector('#card-template').innerHTML.trim();
const template = Handlebars.compile(source);


//Затягнули в обєкт всі наші інпути
const filter = { 
  size: document.querySelectorAll('input[name="size"]'),
  color: document.querySelectorAll('input[name="color"]'),
  release_date: document.querySelectorAll('input[name="release_date"]'),
 }

//Створимо конструктор, данні якого будуть змінюватись при відправці форми
function UserChange(size, color, release_date) {
    this.size = size;
    this.color = color;
    this.release_date = release_date;
};

//вішаємо собитівя 
form.addEventListener('submit', handlerFormSubmit);

function handlerFormSubmit(e) {
    e.preventDefault();

    const size = takeValueInputArray(filter.size);
    const color = takeValueInputArray(filter.color);
    const release_date = takeValueInputArray(filter.release_date);

    const userChange = new UserChange(size, color, release_date);

    //отримали масив з усіма картками які пройшли фільтр користувача
    const arrChange = filterByUserChecked(userChange);

    //відмальовуємо наші картки
    paintedUserChange(arrChange, list);
}

//отримує масив і елемент DOM 
//массив - це всі наші картки які пройшли фільтр від користувача
//елемент DOM - це місце в DOM де мають відрендеритись всі картки
function paintedUserChange(array, root){
    const markup = array.reduce((acc, obj) => acc + template(obj), "");
    
    root.insertAdjacentHTML('afterbegin', markup);
  }

function valueIsNaN(value) {
    if(isNaN(value)) {
        return value;
    }

    return Number(value);
}

function takeValueInputArray(input) {
    const inputValue = Array.from(input).reduce((acc, input) => {
        if(input.checked) {
            acc.push(valueIsNaN(input.value));
        }    

        return acc;
    }, []);

    return inputValue;
}

function filterSearchArrayValue(obj) {
    const arrayValues = [];

    for(const arr in obj) {
        arrayValues.push(...arr);
    }

    // for(const arr in obj) {
    //     arr.reduce(values => values.filter((value => value === )))
    // }

    return arrayValues;
}

//проходимось помасиву і данні масиву використовуємо для пошуку в обєкту з нашими ноутами(laptops)
//userArray - один з масивів наших значень з checked
//property - імя інпута яке будимо використовувати в порівнянні
//sourceArray - база данних всіх існуючих карточок
//filteredArray - витягнули всі картки які проходять фільтрацію
//formedArray - помістили наші картки в масив і повертаємо масив з функції
function filteredProperty(userArray, property, sourceArray){
    //в константу запишиться всі картки з laptops які пройшли перевірку
    const result = userArray.reduce((acc, prop) => {
        //отримаємо масив карток які пройшли перевірку
        const filteredArray = sourceArray.filter(obj => obj[property] === prop)
        const  formedArray = acc.concat(filteredArray)

        return formedArray;
    }, []);

return result;
}

//Отримуємо обєкт і для кожного ключа(а це массив) запускаємо функцію. В кінці виводимо результат цепочки перебору
function filterByUserChecked ({size, color, release_date}) {
        
    const arrayUserSize = filteredProperty(size, "size", laptops);
    const arrayUserColor = filteredProperty(color, "color", arrayUserSize);
    const filteredArray = filteredProperty(release_date, "release_date", arrayUserColor);

    return filteredArray;
}
