import {setCartQuantity} from "./utils.js";

let books

function searchEngine(input) {
    const search__results = document.querySelector('.search__results')
    search__results.innerHTML = ''
    search__results.style.padding = 0

    if (input !== '') {
        books.filter(book=>book.title.toLowerCase().includes(input.toLowerCase())).map(book=>{
            search__results.innerHTML += `
            <a class="search__result" href="/html/book.html?id=${book.id}">${book.title}</a>
        `
        })

        if (search__results.innerHTML.length){
            search__results.style.padding = '10px'
        }
    }
}

function configureSearch() {
    const search__field = document.querySelector(".search__field");
    search__field.addEventListener("input", ()=>searchEngine(search__field.value))
}

function configureCatalog(){
    let catalog = document.querySelector('.catalog')
    let catalog_btn = document.querySelector('.catalog__button')
    let shading = document.querySelector('.shading')

    catalog_btn.addEventListener('click', ()=>{
        catalog.classList.toggle('active')
        shading.classList.toggle('active')
    })

    shading.addEventListener('click', ()=>{
        catalog.classList.toggle('active')
        shading.classList.toggle('active')
    })

}

async function fillCatalog(){
    let genres = await (await fetch("../genres.json")).json()
    books = await (await fetch("../books.json")).json()
    let catalog = document.querySelector('.catalog__items')
    genres.map(genre=>{
        catalog.innerHTML += `
            <a href="genre.html?id=${genre.id}">
                <div class="catalog__item">
                    <span>${genre.title}</span>
                </div>
            </a>
        `
    })
}

function onLoad(){
    configureSearch()
    setCartQuantity()
    configureCatalog()
    fillCatalog()
}


window.addEventListener("load", onLoad);
