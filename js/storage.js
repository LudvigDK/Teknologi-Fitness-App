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

function getHourRangesForPeriod(startTime, durationMinutes) {
    const pad = n => n.toString().padStart(2, "0");
    const rangeLabel = h => {
        const next = (h + 1) % 24;
        return `${pad(h)}-${pad(next)}`;
    };

    const start = new Date(startTime);
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
// Hours until 00:00 at the start of (today + 2 days)
function hoursUntilTwoDaysForwardMidnight(now = new Date()) {
    // Target: 00:00 of (today + 2 days)
    const target = new Date(now);
    target.setHours(0, 0, 0, 0);      // today at 00:00
    target.setDate(target.getDate() + 2); // +2 days

    const msLeft = target - now;      // positive if target is in the future
    return msLeft / (1000 * 60 * 60); // hours (can be fractional)
}


let storage = null
let default_storage = {
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
        '10-11': 0,
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
    streak_left: 0,
    active_streak: false,
}

function RegisterWorkout(start, duration) {
    if (typeof(start) !== Date)
        console.error('"time" argument needs to be parsed as a Date object')

    const workout_start = new Date()
    workout_start.setHours(start.getHours())
    workout_start.setMinutes(start.getMinutes())
    workout_start.setSeconds(0)
    workout_start.setMilliseconds(0)

    const span = getHourRangesForPeriod(workout_start, duration)

    storage.streak += 1
    storage.active_streak = true

    storage.workouts.push({
        iso: workout_start.toISOString(),
        duration: duration
    })

    span.forEach(key => {
        storage.workout_heatmap[key] += 1
    });

    let avg_duration = 0
    storage.workouts.forEach(workout => {
        avg_duration += workout.duration
    });
    avg_duration /= storage.workouts.length
    storage.avg_workout_duration = avg_duration

    save('storage', storage)
}

function LoadStorage() {
    storage = load('storage', default_storage)
}

function StorageTick(interval = 5000) {
    function streakCheck() {
        if (storage.active_streak) {
            const last_workout_time = new Date(storage.workouts.at(-1).iso)
            const hours_left_of_streak = hoursUntilTwoDaysForwardMidnight(last_workout_time)
            
            storage.streak_left = Math.ceil(hours_left_of_streak)
            if (Math.ceil(hours_left_of_streak) == 0) {
                storage.streak = 0
                storage.active_streak = false
            }
        }
    }

    streakCheck()

    setTimeout(() => { StorageTick(interval) }, interval);
}

function StorageInit() {
    LoadStorage()
    StorageTick()
}

StorageInit()