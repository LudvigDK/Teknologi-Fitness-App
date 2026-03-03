const rollers = document.querySelectorAll('.roller');

rollers.forEach(roller => {
    const options = [...roller.querySelectorAll('.option')];

    // pick initial
    let initial = roller.querySelector('.option[initial]') || options[0];

    // scroll to initial (center it)
    roller.scrollTop = initial.offsetTop - (roller.clientHeight / 2) + (initial.offsetHeight / 2);
    roller.dataset.val = initial.dataset.val;

    function update() {
        // IMPORTANT: compute rRect INSIDE update (no drift)
        const rRect = roller.getBoundingClientRect();

        let closestDist = Infinity;
        let closestObj = options[0];

        for (const option of options) {
            const oRect = option.getBoundingClientRect();

            const dist = Math.round(Math.abs((oRect.top - rRect.top + oRect.height / 2) - (roller.clientHeight / 2)));

            option.style.setProperty('--distanceToCenterY', `${dist}px`);

            if (dist < closestDist) {
                closestDist = dist;
                closestObj = option;
            }
        }

        roller.dataset.val = closestObj.dataset.val;
    }

    // rAF throttle to keep it smooth
    let raf = 0;
    roller.addEventListener('scroll', () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
            raf = 0;
            update();
        });
    }, { passive: true });

    // update on resize too
    window.addEventListener('resize', update);

    update();
});