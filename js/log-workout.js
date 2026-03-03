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