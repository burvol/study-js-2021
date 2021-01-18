'use strict';

/*
  Создайте компонент галлереи изображений следующего вида.
  
    <div class="image-gallery js-image-gallery">
      <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
      </div>
      <!-- li будет столько, сколько объектов в массиве картинок. Эти 3 для примера -->
      <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="https://placeimg.com/1000/400/any" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
      </ul>
    </div>   
    
    🔔 Превью компонента: https://monosnap.com/file/5rVeRM8RYD6Wq2Nangp7E4TkroXZx2
      
      
    Реализуйте функционал:
      
      - image-gallery есть изначально в HTML-разметке как контейнер для компонента.
    
      - fullview содержит в себе увеличенную версию выбранного изображения из preview, и
        создается динамически при загрузке страницы.
    
      - preview это список маленьких изображений, обратите внимание на атрибут data-fullview,
        он содержит ссылку на большое изображение. preview и его элементы, также создаются 
        динамически, при загрузке страницы.
        
      - При клике в элемент preview, необходимо подменить src тега img внутри fullview
        на url из data-атрибута выбраного элемента.
        
      - По умолчанию, при загрузке страницы, активным должен быть первый элемент preview.
        
      - Изображений может быть произвольное количество.
      
      - Используйте делегирование для элементов preview.
      
      - При клике, выбраный элемент из preview должен получать произвольный эффект выделения.
      
      - CSS-оформление и имена классов на свой вкус.
      
      
    🔔 Изображения маленькие и большие можно взять с сервиса https://www.pexels.com/, выбрав при скачивании
      размер. Пусть маленькие изображения для preview будут 320px по ширине, большие для fullview 1280px.
      Подберите изображения одинаковых пропорций.
*/

/*
  Массив объектов с данными для создания компонента выглядит следующим образом.
  Замените пути на соотвествующие вашим, или назовите изображения аналогично.
*/

// ⚠️ ЗАДАНИЕ ПОВЫШЕННОЙ СЛОЖНОСТИ - ВЫПОЛНЯТЬ ПО ЖЕЛАНИЮ

//   Создайте плагин галлереи используя ES6 класс. Добавьте поля и методы класса так, 
//   чтобы можно было создать любое количество галлерей на странице. Функционал плагина 
//   аналогичный заданию выше.

//   При создании экземпляра конструктор получает:
//     - items - список элементов для preview
//     - parentNode - ссылку на DOM-узел в который будут помещены fullview и preview
//     - defaultActiveItem - номер активного элемента preview по умолчанию

//   Тогда создание экземпляра будет выглядеть следующим образом.


// new Gallery({
//   items: galleryItems,
//   parentNode: document.querySelector('.image-gallery'),
//   defaultActiveItem: 1
// });

const galleryItems = [
  { preview: 'img/preview-1.jpeg', fullview: 'img/fullwiew-1.jpg', alt: "alt text 1" },
  { preview: 'img/preview-2.jpeg', fullview: 'img/fullview-2.jpeg', alt: "alt text 2" },
  { preview: 'img/preview-3.jpeg', fullview: 'img/fullview-3.jpeg', alt: "alt text 3" },
  { preview: 'img/preview-4.jpeg', fullview: 'img/fullview-4.jpeg', alt: "alt text 4" },
  { preview: 'img/preview-5.jpeg', fullview: 'img/fullview-5.jpeg', alt: "alt text 5" },
  { preview: 'img/preview-6.jpeg', fullview: 'img/fullview-6.jpeg', alt: "alt text 6" },
];

/* <div class="fullview">
        <!-- Если выбран первый элемент из preview -->
        <img src="img/fullview-1.jpeg" alt="alt text 1">
</div> */

function createFullviewElement() {
    const fullview = document.createElement('div');
    fullview.classList.add('fullview');

    const image = document.createElement('img');
    image.setAttribute('src', 'img/fullview-2.jpeg');
    image.setAttribute('alt', 'alt text 1');

    fullview.append(image);
    
    return fullview;
}

{/* <ul class="preview">
        <li><img src="img/preview-1.jpeg" data-fullview="img/fullview-1.jpeg" alt="alt text 1"></li>
        <li><img src="img/preview-2.jpeg" data-fullview="https://placeimg.com/1000/400/any" alt="alt text 2"></li>
        <li><img src="img/preview-3.jpeg" data-fullview="img/fullview-3.jpeg" alt="alt text 3"></li>
</ul> */}

function createPreviewElement() {
    const preview = document.createElement('ul');
    preview.classList.add('preview');

    const items = galleryItems.map(galleryItem => {
      return createItemElement(galleryItem);
    })

    preview.append(...items);    

    return preview;
}

function createItemElement({preview, alt, fullview} = obj) {
    const item = document.createElement('li');
    const image = document.createElement('img');
    image.setAttribute('src', preview);
    image.setAttribute('data-fullview', fullview);
    image.setAttribute('alt', alt);

    item.append(image);
    
    return item;
}

const imageGallery = document.querySelector('.image-gallery');
const fullview = createFullviewElement();
const preview = createPreviewElement();

imageGallery.append(fullview, preview);



document.addEventListener('DOMContentLoaded', () => {
  const previewList = document.querySelector('.preview');

  previewList.addEventListener('click', handlerFullview);

  function handlerFullview(e) {
    console.log(e);
  }
})
