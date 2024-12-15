export function getRatingStars(rating){
    let res = ''
    let color = "#fbb500"
    for (let i = 1; i < 6; i++){
        if (Math.round(rating) < i){
            color = "#d3dadf"
        }
        res += `
            <span class='rating__star'>
                <svg viewBox="0 0 24 24" fill=${color} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
            </span>
        `
    }
    return res
}

export function getAuthors(authors){
    let res = ''
    for (let author of authors){
        res += `<span>${author.name}</span><br>`
    }
    return res
}

export function cropDescription(description, num){
    let text_arr = description.split(' ')
    if (text_arr.length > num){
        return text_arr.slice(0, num).join(' ') + ' ...'
    }
    return description
}

export function addToCart(book){
    if (localStorage.getItem('cart')){
        let cart = JSON.parse(localStorage.getItem('cart'))
        if (!cart.find(item=>item.id === book.id)){
            cart.push(book)
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }
    else {
        localStorage.setItem('cart', JSON.stringify([book]))
    }
    setCartQuantity()
}

export function clearCart(){
    localStorage.removeItem('cart')
    setCartQuantity()
}

export function setCartQuantity(){
    const cart_quantity = document.getElementById('cart_quantity')
    if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length > 0){
        cart_quantity.innerHTML = JSON.parse(localStorage.getItem('cart')).length
    }else {
        cart_quantity.innerHTML = 0
    }
    cart_quantity.hidden = Number(cart_quantity.innerHTML) <= 0;
}