function showNotification(text, timeout, delay=0) {
    setTimeout(() => {
        let noti = document.createElement('span')
        noti.textContent = text
        noti.classList.add('notification')
        document.body.appendChild(noti)
        noti.style.setProperty('--content-width', `${noti.scrollWidth}px`)
        noti.classList.add('shown')
        setTimeout(() => {
            noti.classList.remove('shown')
            noti.addEventListener('transitionend', (e) => {
                document.body.removeChild(noti)
            }, { once: true })
        }, timeout);
    }, delay);
}