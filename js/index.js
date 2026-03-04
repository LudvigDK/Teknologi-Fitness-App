const main = document.querySelector('main')
const content = document.querySelector('#content')
const bg = document.querySelector('#bg')

window.addEventListener('scroll', () => {
    console.log('aa')
    content.style.setProperty('--scroll', `${window.scrollY}`)
    bg.style.setProperty('--content-scroll', `${window.scrollY}`)
})


const date_display = document.querySelector('#date')

function updateDate() {
    const days = ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fridag','Lørdag'];
    const months = ['Januar','Februar','Marts','April','Maj','Juni','Juli','August','September','November','December'];
    const now = new Date()
    date_display.textContent = `${days[now.getDay()]} d. ${now.getDate()} ${months[now.getMonth()]}`
}

setTimeout(updateDate, 60000);
updateDate()