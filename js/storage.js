// Save data
function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
// Load data
function load(key, defaultValue = null) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
}
// Remove data
function remove(key) {
    localStorage.removeItem(key);
}

function getHourRangesForPeriod(startDate, durationMinutes) {
    const pad = n => n.toString().padStart(2, "0");
    const rangeLabel = h => `${pad(h)}-${pad(h + 1)}`;

    const start = new Date(startDate);
    const end = new Date(start.getTime() + durationMinutes * 60 * 1000);

    // start at the beginning of the start hour
    const cur = new Date(start);
    cur.setMinutes(0, 0, 0);

    const ranges = [];
    while (cur < end) {
        const h = cur.getHours();
        ranges.push(rangeLabel(h));
        cur.setHours(h + 1);
    }

    return ranges;
}

let storage = {
    workouts: [],
    avg_workout_duration: 0,
    workout_heatmap: {
        '00-01': 0,
        '01-02': 0,
        '02-03': 0,
        '03-04': 0,
        '04-05': 0,
        '05-06': 0,
        '06-07': 0,
        '07-08': 0,
        '08-09': 0,
        '09-10': 0,
        '11-12': 0,
        '12-13': 0,
        '13-14': 0,
        '14-15': 0,
        '15-16': 0,
        '16-17': 0,
        '17-18': 0,
        '18-19': 0,
        '19-20': 0,
        '20-21': 0,
        '21-22': 0,
        '22-23': 0,
        '23-00': 0
    },

    streak: 0,
    active_streak: false,
}

function RegistarWorkout(time, duration) {

}