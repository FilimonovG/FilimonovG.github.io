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
        res += `
            <a href="author.html?id=${author.id}">
                <span>
                    ${author.name}
                </span>
            </a>
        `
    }
    return res
}