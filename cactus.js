import {
    getCustomProperty,
    setCustomProperty,
    incrementCustomProperty
} from './updateCurrentProperty.js'

const worldElement = document.querySelector('[data-world]')

const SPEED = 0.05 // Must equal the ground's speed

function updateCactus(timeDelta, speedScale) {
    // Logic to move cactuses
    const cactuses = document.querySelectorAll('[data-cactus]')
    cactuses.forEach((cactus) => {
        const increment = timeDelta * SPEED * -1
        incrementCustomProperty(cactus, '--left', increment * speedScale)
        const leftPosition = getCustomProperty(cactus, '--left')
        if (leftPosition <= 0) cactus.remove()
    })
}

function setupCactus() {
    const cactuses = document.querySelectorAll('[data-cactus]')
    cactuses.forEach((cactus) => cactus.remove())
}

function generateNewCactus() {
    const cactus = document.createElement('img')
    cactus.dataset.cactus = true
    cactus.src = './imgs/cactus.png'
    cactus.classList.add('cactus')
    setCustomProperty(cactus, '--left', 100)
    setCustomProperty(cactus, '--height', randomNumberBetween(20, 30))
    worldElement.appendChild(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getCactusRects() {
    const cactuses = [...document.querySelectorAll('[data-cactus]')]
    return cactuses.map((cactus) => cactus.getBoundingClientRect())
}

export { updateCactus, setupCactus, getCactusRects, generateNewCactus }
