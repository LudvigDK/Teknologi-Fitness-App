const main = document.querySelector('main')
const content = document.querySelector('#content')
const bg = document.querySelector('#bg')

const glow = document.querySelector('#glow')
const big_glow = document.querySelector('#big-glow')

const animal = document.querySelector('#animal')
const animal_title = document.querySelector('#animal-title')
const info_text = document.querySelector('#info-text')
const progress_bar = document.querySelector('#progress-bar')
const progress_label = document.querySelector('#progress-label')

function setAnimal(index) {
    save('stats', {
        animal_index: index,
        progress: 0
    })
    updateAnimal()
}

function resetStats() {
    localStorage.removeItem('stats')
    updateAnimal()
}

function loadStats() {
    return load('stats', {
        animal_index: 0,
        progress: 0
    })
}

function addProgress(amount) {
    let stats = loadStats()
    let animal_data = JSON.parse(
        document.getElementById('animal-data').textContent
    );

    stats.progress += amount

    if (stats.progress >= animal_data[stats.animal_index].days) {
        stats.progress = 0
        stats.animal_index += 1
    }
    
    save('stats', stats)
    updateAnimal()
}

function setPrimary(color) {
    document.documentElement.style.setProperty('--primary-r', Number(color[0]))
    document.documentElement.style.setProperty('--primary-g', Number(color[1]))
    document.documentElement.style.setProperty('--primary-b', Number(color[2]))
}

function updateAnimal() {
    let animal_data = JSON.parse(
        document.getElementById('animal-data').textContent
    );

    let stats = loadStats()

    glow.style["background-color"] = `rgba(var(--primary-rgb), ${animal_data[stats.animal_index].glow})`
    big_glow.style["background-color"] = `rgba(var(--primary-rgb), calc(${animal_data[stats.animal_index].glow} * 0.1))`

    animal.textContent = animal_data[stats.animal_index].emoji
    animal_title.textContent = animal_data[stats.animal_index].name
    info_text.textContent = animal_data[stats.animal_index].tagline

    progress_bar.style.width = `${(stats.progress / animal_data[stats.animal_index].days) * 100}%`
    progress_label.textContent = `Næste udvikling: ${stats.progress}/${animal_data[stats.animal_index].days}`

    setPrimary(animal_data[stats.animal_index].color)
}

loadStats()
updateAnimal()

window.addEventListener('scroll', () => {
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


if (!load('onbording')) {
    startOnbording()
    window.addEventListener('onbordingended', () => {
        save('onbording', true)
    }, { once: true })
}

let last_push_request = -1
window.addEventListener('click', () => {
    if (!load('onbording')) return;
    if (new Date().getTime() - last_push_request > 1800000 || last_push_request === -1) {
        window.enablePush()
        last_push_request = new Date().getTime()
    }
})