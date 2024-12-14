import {getRatingStars, getAuthors, addToCart} from "./utils.js";

function fillCard(book){

    let card = document.createElement('div')
    card.classList.add("card")

    card.innerHTML = `
            <div class="card__image">
                <a href="book.html?id=${book.id}">
                    <img class="image__value" src=${book.img} alt="">
                </a>
            </div>
            <div class="card__price">
                <span class="price__value">${book.price} ₽</span>
            </div>
            <div class="card__title">
                <a href="book.html?id=${book.id}">
                    <span>${book.title}</span>
                </a>
            </div>
            <div class="card__authors">${getAuthors(book.authors)}</div>
            <div class="card__rating">
                ${getRatingStars(book.rating)}
                <span class='rating__value'>${book.rating}</span>
                <span class='number_of_ratings__value'>(${book.number_of_ratings})</span>
            </div>
    `

    let btn = document.createElement('button')
    btn.classList.add('card__button-buy')
    btn.innerHTML = 'Купить'
    btn.addEventListener('click', ()=>addToCart(book))

    card.append(btn)

    return card
}

async function fillSection(){

    let content = document.querySelector('.content')
    let genres = await (await fetch("../genres.json")).json()
    let books = await (await fetch("../books.json")).json()

    genres.slice(0, 2).map(genre=>{

        if (genre.books.length === 0){
            return
        }

        let section = document.createElement('section')
        section.className = 'section'
        section.innerHTML = `
            <div class="section__title">
                <a class="section__title-link" href="genre.html?id=${genre.id}">
                    ${genre.title}
                </a>
            </div>
        `
        let section_content = document.createElement('div')
        section_content.className = 'section__content'

        books.slice(0, 4).map(book=>{
            if (genre.id === book.genre.id){
                section_content.append(fillCard(book))
            }
        })

        section.append(section_content)
        content.append(section)
    })
}


function onLoad(){
    fillSection()
}


window.addEventListener("load", onLoad);
