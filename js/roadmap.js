function setCompleted(roadmap, index) {
    const length = roadmap.querySelectorAll('.mission').length
    const step = 1 / length
    const percent = ((step * index) - (step / 2)) * 100

    roadmap.style.setProperty('--completed', `${percent}%`)

    let toKeep = []
    for (let i = 0; i < index; i++) {
        roadmap.children[i].classList.add('completed')
        toKeep.push(roadmap.children[i])
    };
    roadmap.querySelectorAll('.completed').forEach(e => {
        if (!toKeep.includes(e))
            e.classList.remove('completed')
    });
}