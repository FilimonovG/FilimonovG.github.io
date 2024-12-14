import {getRatingStars, getAuthors, addToCart} from "./utils.js";

function fillCard(book){

    let card = document.createElement('div')
    card.classList.add("card")

    card.innerHTML = `
            <div class="card__image">
                <a href="html/book.html?id=${book.id}">
                    <img class="image__value" src=${book.img} alt="">
                </a>
            </div>
            <div class="card__price">
                <span class="price__value">${book.price} ₽</span>
            </div>
            <div class="card__title">
                <a href="html/book.html?id=${book.id}">
                    <span>${book.title}</span>
                </a>
            </div>
            <div class="card__authors">${getAuthors(book.authors)}</div>
            <div class="card__rating">
                ${getRatingStars(book.rating)}
                <span class='rating__value'>${book.rating}</span>
                <span class='number_of_ratings__value'>(${book.number_of_ratings})</span>
            </div>
            <button class="button card__button-buy">Купить</button>
    `

    let btn = card.querySelector('.card__button-buy')
    btn.addEventListener('click', ()=>addToCart(book))
    
    return card
}

async function fillSection(){

    let content = document.querySelector('.content')
    let genres = await (await fetch("../genres.json")).json()
    let books = await (await fetch("../books.json")).json()

    genres.map(genre=>{
        if (genre.books.length !== 0){
            let section = document.createElement('section')
            section.className = 'section'
            section.innerHTML = `
                <div class="section__title">
                    <a class="section__title-link" href="html/genre.html?id=${genre.id}">${genre.title}</a>
                </div>
            `
            let section_content = document.createElement('div')
            section_content.className = 'section__content'

            books.filter(book=>book.genre.id === genre.id).slice(0, 4).map(book=>{
                section_content.append(fillCard(book))
            })

            section.append(section_content)
            content.append(section)
        }
    })
}


function onLoad(){
    fillSection()
}


window.addEventListener("load", onLoad);
