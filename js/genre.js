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
                                        <button class="button buy__button">Купить</button>
                                    </div>
                                </div>
                            </div>
    `
    book__wrapper.querySelector('.buy__button').addEventListener('click', ()=>addToCart(book))
    return book__wrapper

}

function fillPage(){

    let content = document.querySelector('.genre__content')

    if (genre_books.length === 0){
        content.innerHTML = 'Книг этого жанра нет'
        return
    }

    content.innerHTML = ''

    genre_books.map(book=>{
        content.append(fillBook(book))
    })
}

function sortByRating(){
    document.getElementById('sort__value').innerHTML = 'По рейтингу'
    genre_books.sort((a,b)=>b.rating - a.rating)
    toggleSort()
    fillPage()
}

function sortByReview(){
    document.getElementById('sort__value').innerHTML = 'По отзывам'
    genre_books.sort((a,b)=>b.number_of_ratings - a.number_of_ratings)
    toggleSort()
    fillPage()
}

function sortByName(){
    document.getElementById('sort__value').innerHTML = 'По названию от (А до Я)'
    genre_books.sort((a,b)=>a.title.localeCompare(b.title))
    toggleSort()
    fillPage()
}

function sortByNameReverse(){
    document.getElementById('sort__value').innerHTML = 'По названию от (Я до А)'
    genre_books.sort((a,b)=>b.title.localeCompare(a.title))
    toggleSort()
    fillPage()
}

function toggleSort(){
    let sort__items = document.querySelector('.sort__items')
    sort__items.style.display = sort__items.style.display === 'block' ? 'none' : 'block';
}

function configureSelect(){
    genre_books = books.filter(book => book.genre.id === Number(id))
    genre_books.sort((a,b)=>b.rating - a.rating)
    document.getElementById('sort__value').addEventListener('click', toggleSort)
    document.getElementById('sort_by_rating').addEventListener('click', sortByRating)
    document.getElementById('sort_by_review').addEventListener('click', sortByReview)
    document.getElementById('sort_by_name').addEventListener('click', sortByName)
    document.getElementById('sort_by_name_reverse').addEventListener('click', sortByNameReverse)
}

async function onLoad(){
    id = location.search.split("=")[1]
    books = await (await fetch("../books.json")).json()

    let genres = await (await fetch("../genres.json")).json()
    let genre__title = document.querySelector('.genre__title')
    genre__title.innerHTML = genres.find(genre=>genre.id === Number(id)).title

    configureSelect()
    fillPage()
}


window.addEventListener("load", onLoad);
