const logWorkoutModal = document.querySelector('#log-workout-modal')

function showLogModal() {
    logWorkoutModal.classList.add('shown')
}
function hideLogModal() {
    logWorkoutModal.classList.remove('shown')
}
function toggleLogModal() {
    logWorkoutModal.classList.toggle('shown')
}



const logSubmitBtn = logWorkoutModal.querySelector('#log-btn')
const hourRoller = logWorkoutModal.querySelector('#hour-roller')
const minuteRoller = logWorkoutModal.querySelector('#minute-roller')
const durationRoller = logWorkoutModal.querySelector('#duration-roller')

logSubmitBtn.addEventListener('click', () => {
    let start = new Date()
    start.setHours(Number(hourRoller.dataset.val))
    start.setMinutes(Number(minuteRoller.dataset.val))

    RegisterWorkout(start, Number(durationRoller.dataset.val))
    hideLogModal()
})