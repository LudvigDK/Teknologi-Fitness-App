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

main.addEventListener('scroll', () => {
    content.style.setProperty('--scroll', `${main.scrollTop}`)
    bg.style.setProperty('--content-scroll', `${main.scrollTop}`)
})

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

    console.log(animal_data[stats.animal_index].color)
    document.documentElement.style.setProperty('--primary-rgb', animal_data[stats.animal_index].color)
}

loadStats()
updateAnimal()