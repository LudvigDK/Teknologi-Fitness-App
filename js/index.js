const main = document.querySelector('main')
const content = document.querySelector('#content')

main.addEventListener('scroll', () => {
    content.style.setProperty('--scroll', `${main.scrollTop}`)
})