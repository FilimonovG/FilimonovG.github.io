import {getRatingStars} from "./utils.js";
import {getAuthors} from "./utils.js";

function getAttributes(attributes) {
    let res = ''
    for (let attribute of attributes) {
        res += `
            <div class="attributes__row">
                <div class="attributes__col">
                    <p class="attributes__text">
                        ${attribute.title}
                    </p>
                </div>
                <div class="attributes__col">
                    <p class="attributes__text">
                        ${attribute.value}
                    </p>
                </div>
            </div>
        `
    }
    return res
}

function getReviews(reviews) {
    let res = ''
    for (let review of reviews) {
        res += `
        <div class="review">
            <div class="review__author">
                <span class="author__text">
                    ${review.username}
                </span>
                <span class="author__text">
                    ${review.date}
                </span>
            </div>
            <div class="review__rating">
                <span class='review-rating__value'>
                    ${review.rating}
                </span>
                ${getRatingStars(review.rating)}
            </div>
            <div class="review__header">
                <p>
                    ${review.title}
                </p>
            </div>
            <div class="review__content">
                <p>
                    ${review.text}
                </p>
            </div>
        </div>        
        `
    }
    return res
}

async function fillBook(params) {

    let id = params.split("=")[1]
    let books = await (await fetch("../books.json")).json()
    let book = books.find(book => book.id === Number(id))

    let book__title = document.querySelector('.book__title')
    let book__authors = document.querySelector('.book__authors')
    let img__value = document.querySelector('.img__value')
    let price__value = document.querySelector('.price__value')
    let details__rating = document.querySelector('.details__rating')
    let description__value = document.querySelector('.description__value')
    let details__attributes = document.querySelector('.details__attributes')
    let reviews__content = document.querySelector('.reviews__content')

    book__title.innerHTML = book.title
    img__value.src = book.img
    price__value.innerHTML = book.price + ' ₽'
    description__value.innerHTML = book.description
    book__authors.innerHTML = getAuthors(book.authors)
    details__rating.innerHTML = getRatingStars(book.rating)

    let rating__value = document.createElement('span')
    rating__value.classList.add('rating__value')
    rating__value.innerHTML = book.rating

    let number_of_ratings = document.createElement('span')
    number_of_ratings.classList.add('number_of_ratings__value')
    number_of_ratings.innerHTML = `(${book.number_of_ratings})`

    details__rating.append(rating__value)
    details__rating.append(number_of_ratings)
    details__attributes.innerHTML = getAttributes(book.attributes)
    reviews__content.innerHTML = getReviews(book.reviews)
}

function onLoad() {
    fillBook(location.search)
}

window.addEventListener("load", onLoad);
