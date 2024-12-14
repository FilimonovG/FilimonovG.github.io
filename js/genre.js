import {cropDescription, getAuthors, getRatingStars, addToCart} from "./utils.js";

let id
let books
let genre_books

function fillBook(book){

    const book__wrapper = document.createElement('div')
    book__wrapper.classList.add('book__wrapper')
    book__wrapper.innerHTML = `
                            <div class="book">
                                <div class="book__image">
                                    <a href="book.html?id=${book.id}">
                                        <img class="image__value" src="${book.img}">
                                    </a>
                                </div>
                                <div class="book__details">
                                    <div class="book__info">
                                        <div class="book__title">
                                            <p class="title__value">
                                                <a href="book.html?id=${book.id}">${book.title}</a>    
                                            </p>
                                        </div>
                                        <div class="book__authors">
                                                <p class="authors__value">${getAuthors(book.authors)}</p>
                                        </div>
                                        <div class="book__rating">
                                            <div class="rating__stars">${getRatingStars(book.rating)}</div>
                                            <span class="rating__value">${book.rating}</span>
                                            <span class="number-of-ratings__value">(${book.number_of_ratings})</span>
                                        </div>
                                    </div>
                                    <div class="book__description">
                                        <p class="description__value">${cropDescription(book.description, 41)}</p>
                                    </div>
                                    <div class="book__buy">
                                        <span class="book__price">${book.price} ₽</span>
                                        <button class="buy__button">Купить</button>
                                    </div>
                                </div>
                            </div>
    `
    book__wrapper.querySelector('.buy__button').addEventListener('click', ()=>addToCart(book))
    return book__wrapper

}

function fillPage(){
    let genre__title = document.querySelector('.genre__title')
    let content = document.querySelector('.genre__content')

    content.innerHTML = ''

    genre_books.map(book=>{
        genre__title.innerHTML = book.genre.title
        content.append(fillBook(book))
    })
}

function sortByRating(){
    genre_books.sort((a,b)=>a.rating < b.rating)
    fillPage()
}

function sortByReview(){
    genre_books.sort((a,b)=>a.number_of_ratings < b.number_of_ratings)
    fillPage()
}

function sortByName(){
    genre_books.sort((a,b)=>a.title > b.title)
    fillPage()
}

function sortByNameReverse(){
    genre_books.sort((a,b)=>a.title < b.title)
    fillPage()
}

async function onLoad(){
    id = location.search.split("=")[1]
    books = await (await fetch("../books.json")).json()
    genre_books = books.filter(book => book.genre.id === Number(id))

    document.getElementById('sort_by_rating').addEventListener('click', sortByRating)
    document.getElementById('sort_by_review').addEventListener('click', sortByReview)
    document.getElementById('sort_by_name').addEventListener('click', sortByName)
    document.getElementById('sort_by_name_reverse').addEventListener('click', sortByNameReverse)


    fillPage()
}


window.addEventListener("load", onLoad);
