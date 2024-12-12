import {getAuthors, getRatingStars} from "./utils.js";

function fillCard(book){
    return`
        <div class="card__wrapper">
            <div class="card">
                <div class="card__image">
                    <a href="book.html?id=${book.id}">
                        <img class="image__value" src=${book.img} alt="">
                    </a>
                </div>
                <div class="card__price">
                    <span class="price__value">
                        ${book.price} ₽
                    </span>
                </div>
                <div class="card__rating">
                    ${getRatingStars(book.rating)}
                    <span class='rating__value'>
                        ${book.rating}
                    </span>
                    <span class='number_of_ratings__value'>
                        (${book.number_of_ratings})
                    </span>
                </div>
                <button class="card__button-buy">Купить</button>
            </div>
            <div class="card__details">
                <div class="details__header">
                    <div class="card__title">
                        <a href="book.html?id=${book.id}">
                            <span>
                                ${book.title}
                            </span>
                        </a>
                    </div>
                    <div class="card__authors">
                        ${getAuthors(book.authors)}
                    </div>
                </div>
                <div class="details__content">
                    <p>
                        ${book.description}
                    </p>
                </div>
            </div>
        </div>    
    `
}

async function fillPage(params){
    let id = params.split("=")[1]
    let books = await (await fetch("../books.json")).json()
    let genre_books = books.filter(book => book.genre.id === Number(id))
    let genre__title = document.querySelector('.genre__title-value')
    let content = document.querySelector('.genre__content')
    genre_books.map(book=>{
        genre__title.innerHTML = book.genre.title
        content.innerHTML += fillCard(book)
    })
}


function onLoad(){
    fillPage(location.search)
}


window.addEventListener("load", onLoad);
