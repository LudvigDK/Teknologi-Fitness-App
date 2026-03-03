const drag_effects = document.querySelectorAll('[draggable]')
const drag_intensity = .011
const size_decrease = .96
const max_stretch = 12000

drag_effects.forEach(e => {
    if (e.getAttribute('draggable') === 'wrapper') {
        const wrapper = document.createElement('div');
        wrapper.className = 'drag-wrapper';

        e.replaceWith(wrapper);
        wrapper.appendChild(e);

        wrapper.addEventListener('touchstart', (event) => {
            const touch = event.touches[0]

            wrapper.dataset.startX = touch.clientX
            wrapper.dataset.startY = touch.clientY
            wrapper.classList.add('dragging')
            wrapper.style = `transform: scale(${size_decrease});`
        })

        wrapper.addEventListener('touchend', (event) => {
            wrapper.classList.remove('dragging')
            wrapper.style = ``
        });
    } else {
        e.addEventListener('touchstart', (event) => {
            const touch = event.touches[0]

            e.dataset.startX = touch.clientX
            e.dataset.startY = touch.clientY
            e.classList.add('dragging')
            e.style = `transform: scale(${size_decrease});`
        })

        e.addEventListener('touchend', (event) => {
            e.classList.remove('dragging')
            e.style = ``
        });
    }
});

document.addEventListener('touchmove', (event) => {
    document.querySelectorAll('.dragging').forEach(e => {
        const touch = event.touches[0]

        const diff_x = touch.clientX - e.dataset.startX
        const diff_y = touch.clientY - e.dataset.startY

        const stretch_x = size_decrease + (Math.abs(diff_x) / max_stretch)
        const stretch_y = size_decrease + (Math.abs(diff_y) / max_stretch)

        e.style = `transform: translate(${diff_x * drag_intensity}px, ${diff_y * drag_intensity}px) scale(${stretch_x}, ${stretch_y});`
    });
        
    }, { passive: false });