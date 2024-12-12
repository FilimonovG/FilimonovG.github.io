import {getRatingStars, getAuthors} from "./utils.js";

function fillCard(card){
    return `
        <div class="card">
            <div class="card__image">
                <a href="book.html?id=${card.id}">
                    <img class="image__value" src=${card.img} alt="">
                </a>
            </div>
            <div class="card__price">
                <span class="price__value">
                    ${card.price} ₽
                </span>
            </div>
            <div class="card__title">
                <a href="book.html?id=${card.id}">
                    <span>
                        ${card.title}
                    </span>
                </a>
            </div>
            <div class="card__authors">
                ${getAuthors(card.authors)}
            </div>
            <div class="card__rating">
                ${getRatingStars(card.rating)}
                <span class='rating__value'>
                    ${card.rating}
                </span>
                <span class='number_of_ratings__value'>
                    (${card.number_of_ratings})
                </span>
            </div>
            <button class="card__button-buy">Купить</button>
    `
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
                let card = fillCard(book)
                section_content.innerHTML += card
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
