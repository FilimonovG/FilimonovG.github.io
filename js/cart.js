import {clearCart, getAuthors, setCartQuantity} from "./utils.js";

function updateDetails(){

    setCartQuantity()

    const cart__wrapper = document.querySelector('.cart__wrapper')

    if (!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length === 0){
        cart__wrapper.innerHTML = 'Корзина пуста'
        return
    }

    let total = 0
    for (let el of document.querySelectorAll('.item__total')){
        total += Number(el.innerHTML.trim().split(' ')[0])
    }
    document.querySelector('.total-price.value').innerHTML = total + ' ₽'

    let products_amount = 0
    for (let el of document.querySelectorAll('.quantity')){
        products_amount += Number(el.innerHTML.trim()[0])
    }

    document.querySelector('.products__amount').innerHTML = products_amount
}

function changeQuantity(cart__item, num){
    let quantity = cart__item.querySelector('.quantity')
    let item__total = cart__item.querySelector('.item__total')
    let item__price = cart__item.querySelector('.item__price')

    quantity.innerHTML = Number(quantity.innerHTML) + num
    item__total.innerHTML = Number(item__price.innerHTML.split(' ')[0]) * Number(quantity.innerHTML) + ' ₽'

    let decrease__button = cart__item.querySelector('.counter__button.remove')
    if (Number(quantity.innerHTML) > 1){
        decrease__button.classList.remove('disabled')
        decrease__button.disabled = false
    }
    else {
        decrease__button.classList.add('disabled')
        decrease__button.disabled = true
    }

    updateDetails()
}

function fillItem(book){
    let cart__item = document.createElement("div")
    cart__item.classList.add("cart__item")

    cart__item.innerHTML = `
                                <div class="item__image">
                                    <a href="book.html?id=${book.id}">
                                        <img class="image__value" src=${book.img}>
                                    </a>
                                </div>
                                <div class="item__info">
                                    <div class="item__title">
                                        <a href="book.html?id=${book.id}">${book.title}</a>
                                    </div>
                                    <div class="item__authors">
                                        ${getAuthors(book.authors)}
                                    </div>
                                    <div class="item__price">${book.price} ₽/шт.</div>
                                </div>
                                <div class="item__cost">
                                    <div class="item__counter">
                                        <button disabled="disabled" class="counter__button remove disabled">
                                            <span>-</span>
                                        </button>
                                        <span class="quantity">1</span>
                                        <button class="counter__button add">
                                            <span>+</span>
                                        </button>
                                    </div>
                                    <p class="item__total">${book.price} ₽</p>
                                    <div class="clear__item">
                                        <svg data-v-7a84296f="" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" alt="clear-cart" class="icon"><path data-v-7a84296f="" d="M17 19V8H7v11h10z" stroke="#2C7EDC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path data-v-7a84296f="" d="M6 8h12" stroke="#2C7EDC" stroke-width="1.5" stroke-linecap="round"></path><path data-v-7a84296f="" d="M10 8V7a2 2 0 012-2v0a2 2 0 012 2v1" stroke="#2C7EDC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        <span>Убрать из корзины</span>
                                    </div>
                                </div>
    `

    cart__item.querySelector('.clear__item').addEventListener('click', ()=>{
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.pop(book)
        localStorage.setItem('cart', JSON.stringify(cart))
        cart__item.remove()
        updateDetails()
    });

    cart__item.querySelector('.counter__button.remove').addEventListener('click', ()=>changeQuantity(cart__item, -1))
    cart__item.querySelector('.counter__button.add').addEventListener('click', ()=>changeQuantity(cart__item, 1))

    return cart__item
}

function fillCart(){

    const cart__wrapper = document.querySelector('.cart__wrapper')

    if (!localStorage.getItem('cart') || JSON.parse(localStorage.getItem('cart')).length === 0){
        cart__wrapper.innerHTML = 'Корзина пуста'
        return
    }

    const books = JSON.parse(localStorage.getItem('cart'))

    const cart__clear = document.querySelector('.cart__clear')
    cart__clear.addEventListener('click', ()=>{
        clearCart()
        updateDetails()
    })

    const cart__items = document.querySelector('.cart__items')
    cart__items.innerHTML = ''
    books.map(book=>{
        cart__items.append(fillItem(book))
    })

    updateDetails()

}

function onLoad(){
    fillCart()
}


window.addEventListener("load", onLoad);
