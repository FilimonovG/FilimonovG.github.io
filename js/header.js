import {setCartQuantity} from "./utils.js";

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
    setCartQuantity()
    configureCatalog()
    fillCatalog()
}


window.addEventListener("load", onLoad);
