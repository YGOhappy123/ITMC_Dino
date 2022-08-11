import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDinoRect, setDinoLose } from './dino.js'
import {
    updateCactus,
    setupCactus,
    getCactusRects,
    generateNewCactus
} from './cactus.js'
import { updateBird, setupBird, getBirdRects, generateNewBird } from './bird.js'

// Constants and elements
const WORLD_WIDTH = 100
const WORLD_HEIGHT = 25
const SPEED_SCALE_INCREMENT = 0.00002
const MIN_CHALLENGE_INTERVAL = 800
const MAX_CHALLENGE_INTERVAL = 1600

const worldElement = document.querySelector('[data-world]')
const scoreElement = document.querySelector('[data-score]')
const highScoreElement = document.querySelector('[data-high-score]')
const startScreenElement = document.querySelector('[data-start-screen]')

// Scale the world element base on screen size
function scaleWorldElement() {
    let worldScale
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT) {
        worldScale = window.innerWidth / WORLD_WIDTH
    } else {
        worldScale = window.innerHeight / WORLD_HEIGHT
    }
    worldElement.style.width = `${WORLD_WIDTH * worldScale}px`
    worldElement.style.height = `${WORLD_HEIGHT * worldScale}px`
}

scaleWorldElement()
window.addEventListener('resize', scaleWorldElement)

// Update challenge
let nextChallengeTime

function UpdateChallenge(timeDelta, speedScale) {
    if (nextChallengeTime <= 0) {
        generateNewChallenge()
        nextChallengeTime =
            randomNumberBetween(
                MIN_CHALLENGE_INTERVAL,
                MAX_CHALLENGE_INTERVAL
            ) / speedScale
    }
    nextChallengeTime -= timeDelta
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateNewChallenge() {
    const challenge = randomNumberBetween(1, 2)
    switch (challenge) {
        case 1:
            generateNewCactus()
            break
        case 2:
            generateNewBird()
            break
    }
}

// Update content
let lastTime
let speedScale = 1,
    score = 0,
    highScore = 0

function update(time) {
    if (lastTime == null) {
        lastTime = time
        window.requestAnimationFrame(update)
        return
    }

    // Time between 2 animation frame -> proportional to the device's speed
    const timeDelta = time - lastTime
    lastTime = time

    updateGround(timeDelta, speedScale)
    updateDino(timeDelta, speedScale)
    updateCactus(timeDelta, speedScale)
    updateBird(timeDelta, speedScale)
    updateSpeedScale(timeDelta)
    UpdateChallenge(timeDelta, speedScale)
    updateScore(timeDelta)

    if (checkLose()) {
        handleLose()
        return
    }

    window.requestAnimationFrame(update)
}

function updateSpeedScale(timeDelta) {
    speedScale += timeDelta * SPEED_SCALE_INCREMENT
}

// Update score

function updateScore(timeDelta) {
    score += timeDelta * 0.01
    scoreElement.innerText = formatScore(score)

    if (score > highScore) {
        highScore = score
        highScoreElement.innerText = `HI ${formatScore(highScore)}`
    }
}

function formatScore(score) {
    const roundedScore = Math.floor(score)
    const formattedScore =
        roundedScore > 99999 ? roundedScore : `0000${roundedScore}`.slice(-5)
    return formattedScore
}

// Handle start game
document.addEventListener('keydown', handleStartGame, { once: true })

function handleStartGame() {
    lastTime = null
    speedScale = 1
    score = 0
    nextChallengeTime = MIN_CHALLENGE_INTERVAL
    startScreenElement.classList.add('hide')
    setupGround()
    setupDino()
    setupCactus()
    setupBird()
    window.requestAnimationFrame(update)
}

// Handle lose
function checkLose() {
    const dinoRect = getDinoRect()
    const cactusRects = getCactusRects()
    const birdRects = getBirdRects()
    return (
        cactusRects.some((rect) => isCollision(rect, dinoRect)) ||
        birdRects.some((rect) => isCollision(rect, dinoRect))
    )
}

function isCollision(rect1, rect2) {
    return (
        rect1.left < rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top
    )
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        document.addEventListener('keydown', handleStartGame, { once: true })
        startScreenElement.classList.remove('hide')
    }, 200)
}
