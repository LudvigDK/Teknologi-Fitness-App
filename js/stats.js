(() => {

const streak_display = document.querySelector('#streak')

const call_to_action_stat_title = document.querySelector('#call-to-action-stat-title')
const call_to_action_stat_val = document.querySelector('#call-to-action-stat-val')
const avg_duration_stat_title = document.querySelector('#avg-duration-stat-title')
const avg_duration_stat_val = document.querySelector('#avg-duration-stat-val')

function daysSinceISO(iso) {
    const start = new Date(iso);
    const now = new Date();
    const diff = now - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function updateStats() {
    if (storage.streak_left <= 0) {
        let days = daysSinceISO(window.storage.workouts.at(-1))
        if (!days)
            days = 0

        call_to_action_stat_title.textContent = 'Sidste træning'
        call_to_action_stat_val.textContent = `${days} ${days == 1 ? 'dag' : 'dage'}`
    } else {
        call_to_action_stat_title.textContent = 'Streak udløber om'
        call_to_action_stat_val.textContent = `${storage.streak_left == 1 ? 'under ' : ''}${storage.streak_left} ${storage.streak_left == 1 ? 'time' : 'timer'}`
        if (storage.streak_left <= 6) {
            call_to_action_stat_title.closest('.stat').classList.add('warning')
        } else {
            call_to_action_stat_title.closest('.stat').classList.remove('warning')
        }
    }

    avg_duration_stat_title.textContent = 'Gns. varighed'
    avg_duration_stat_val.textContent = `${Math.round(storage.avg_workout_duration)} min`

    streak_display.textContent = `${storage.streak} ${storage.streak == 1 ? 'dag' : 'dage'}`
}

window.addEventListener('storageupdate', updateStats)

updateStats()

})()

