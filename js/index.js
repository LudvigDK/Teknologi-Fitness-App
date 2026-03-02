const main = document.querySelector('main')
const content = document.querySelector('#content')
const bg = document.querySelector('#bg')

main.addEventListener('scroll', () => {
    content.style.setProperty('--scroll', `${main.scrollTop}`)
    bg.style.setProperty('--content-scroll', `${main.scrollTop}`)
})