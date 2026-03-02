const main = document.querySelector('main')
const stats = document.querySelector('#stats')

main.addEventListener('scroll', () => {
    stats.style.setProperty('--scroll', `${main.scrollTop}`)
})