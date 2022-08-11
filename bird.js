import {
    getCustomProperty,
    setCustomProperty,
    incrementCustomProperty
} from './updateCurrentProperty.js'

const worldElement = document.querySelector('[data-world]')

const SPEED = 0.05 // Must equal the ground's speed
const MIN_BIRD_BOTTOM = 20
const MAX_BIRD_BOTTOM = 65

let direction = 1
function updateBird(timeDelta, speedScale) {
    // Logic to move birds
    const birds = document.querySelectorAll('[data-bird]')
    birds.forEach((bird) => {
        const increment = timeDelta * SPEED * -1
        incrementCustomProperty(bird, '--left', increment * speedScale)
        const leftPosition = getCustomProperty(bird, '--left')
        if (leftPosition <= 0) bird.remove()
    })
}

function setupBird() {
    const birds = document.querySelectorAll('[data-bird]')
    birds.forEach((bird) => bird.remove())
}

function generateNewBird() {
    const bird = document.createElement('img')
    bird.dataset.bird = true
    bird.src = './imgs/bird.png'
    bird.classList.add('bird')
    setCustomProperty(bird, '--left', 100)
    setCustomProperty(
        bird,
        '--bottom',
        randomNumberBetween(MIN_BIRD_BOTTOM, MAX_BIRD_BOTTOM)
    )
    setCustomProperty(bird, '--height', randomNumberBetween(15, 20))
    worldElement.appendChild(bird)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function getBirdRects() {
    const birds = [...document.querySelectorAll('[data-bird]')]
    return birds.map((bird) => bird.getBoundingClientRect())
}

export { updateBird, setupBird, getBirdRects, generateNewBird }
