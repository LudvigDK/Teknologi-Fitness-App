const drag_effects = document.querySelectorAll('[draggable]')
const drag_intensity = .01
const size_decrease = .98

drag_effects.forEach(e => {
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
});

document.addEventListener('touchmove', (event) => {
    document.querySelectorAll('.dragging').forEach(e => {
        const touch = event.touches[0]

        const x = (touch.clientX - e.dataset.startX) * drag_intensity
        const y = (touch.clientY - e.dataset.startY) * drag_intensity
        e.style = `transform: translate(${x}px, ${y}px) scale(${size_decrease});`
    });
        
    }, { passive: false });