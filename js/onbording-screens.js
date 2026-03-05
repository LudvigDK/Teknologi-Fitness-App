const onbording = document.querySelector('#onbording-screens')
const screens = onbording.querySelectorAll('.screen')

let current_screen_index = 0

function startOnbording() {
    onbording.classList.add('active')
    current_screen_index = 0
    nextScreen()
}

function nextScreen() {
    screens.forEach(s => {
        s.classList.remove('current')
    });
    screens[current_screen_index].classList.add('current')
    current_screen_index += 1
}

function endOnbording() {
    onbording.classList.remove('active')
    window.dispatchEvent(new Event('onbordingended'))
}