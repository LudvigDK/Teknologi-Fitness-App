(() => {
    function dayOfYearFromISO(iso) {
        const date = new Date(iso);
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / 86400000);
    }

    const streak_past_container = document.querySelector('#streak-past-section #streak-past-container')

    for (let i = 1; i <= 28 * 13; i++) {
        let mode = storage.workouts.some(w => dayOfYearFromISO(w.iso) == i) ? 'active' : 'empty'
        streak_past_container.innerHTML += `<span data-day="${i}" class="past-day ${mode}"></span>`
    }
})()