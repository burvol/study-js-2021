'use strict';

//======================================================
// задания 
//номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ)
//======================================================
/*
  Создайте функцию createMovieCard(), которая 
  создает и возвращает DOM-узел карточки кинофильма.
  
  Разметка с классами есть на вкладке HTML.
  Стили на вкладке CSS.
  
  Используйте createElement для создания узлов.
  Добавьте классы и атрибуты.
*/
/*
<div class="movie">
        <img class="movie__image" src="http://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg" alt="movie image">
        
        <div class="movie__body">
          <h2 class="movie__title">The Godfather</h2>
          <p class="movie__description">Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the
            would-be killers, launching a campaign of bloody revenge.</p>
      
          <p class="movie__date">Released: 1972-03-14</p>
          <p class="movie__rating">Rating: 8.6</p>
        </div>
</div>
*/

function createCard() {
    const image = createImage();
    const body = createCardBody();

    const card = document.createElement('div');
    card.classList.add('movie');

    card.append(image, body);

    return card;
}

function createImage() {
    const image = document.createElement('img');
    image.classList.add('movie__image');
    image.setAttribute('src', "http://image.tmdb.org/t/p/w500/rPdtLWNsZmAtoZl9PK7S2wE3qiS.jpg");
    image.setAttribute('alt', "movie image");

    return image;
}

function createCardBody() {
    const cardBody = document.createElement('div');
    cardBody.classList.add('movie__body');

    const title = document.createElement('h2');
    title.classList.add('movie__title');
    title.textContent = 'The Godfather';
    
    const description = document.createElement('p');
    description.classList.add('movie__description');
    description.textContent = 'Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of thewould-be killers, launching a campaign of bloody revenge.';
    
    const data = document.createElement('p');
    data.classList.add('movie__date');
    data.textContent = 'Released: 1972-03-14';
    
    const rating = document.createElement('p');
    rating.classList.add('movie__rating');
    rating.textContent = 'Rating: 8.6';

    cardBody.append(title, description, data, rating);

    return cardBody;
}

const root = document.querySelector('.root');
const card = createCard();

root.append(card);

//======================================================================================
//------------------------------------------------------------------------------
//Домашка 7
//------------------------------------------------------------------------------

/*
  1. Модифицируйте готовую функцию createPostCard() из задания 
    номер 6 (https://codepen.io/goit-fe-adv/pen/MVPaeZ) так, 
    чтобы она принимала объект post с данными для заполнения полей 
    в карточке.
      
  2. Создайте функцию createCards(posts), которая принимает массив
    объектов-карточек, вызывает функцию createPostCard(post) столько
    раз, сколько объектов в массиве, сохраняя общий результат и возвращает 
    массив DOM-элементов всех постов.
    
  3. Повесьте все посты в какой-то уже существующий DOM-узел.
*/

const posts = [{
  img: "https://placeimg.com/400/150/arch",
  title: "Post title 1",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
  link: 'link-1.com'
},
{
  img: "https://placeimg.com/400/150/nature",
  title: "Post title 2",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
  link: 'link-2.com'
},
{
  img: "https://placeimg.com/400/150/arch",
  title: "Post title 3",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, nemo dignissimos ea temporibus voluptatem maiores maxime consequatur impedit nobis sunt similique voluptas accusamus consequuntur, qui modi nesciunt veritatis distinctio rem!",
  link: 'link-3.com'
}
];

function createPostCard({img, title, text, link} = obj) {

  const image = createPostImage(img);
  const body = createPostCardBody(title, text, link);

  const card = document.createElement('div');
  card.classList.add('movie');

  card.append(image, body);

  return card;
}

function createPostImage(imageSrc) {
  const image = document.createElement('img');
  image.classList.add('movie__image');
  image.setAttribute('src', imageSrc);
  image.setAttribute('alt', "post image");

  return image;
}

function createPostCardBody(titlePost, text, link) {
  const cardBody = document.createElement('div');
  cardBody.classList.add('movie__body');

  const title = document.createElement('h2');
  title.classList.add('movie__title');
  title.textContent = titlePost;
  
  const description = document.createElement('p');
  description.classList.add('movie__description');
  description.textContent = text;
  
  const postLink = document.createElement('a');
  postLink.classList.add('movie__date');
  postLink.textContent = link;
  postLink.setAttribute('href', link);

  cardBody.append(title, description, postLink);

  return cardBody;
}

function createPostCards(posts) {
    return posts.map(post => {
        return createPostCard(post);
    })
}

const cardsPost = createPostCards(posts);

function paintCards(cards) {
  const root = document.querySelector('.root');
  const cardsPost = createPostCards(cards);
  root.append(...cardsPost);
}

paintCards(posts);