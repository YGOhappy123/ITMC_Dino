import {
    getCustomProperty,
    setCustomProperty,
    incrementCustomProperty
} from './updateCurrentProperty.js'

const dinoElement = document.querySelector('[data-dino]')

const JUMP_SPEED = 0.45
const GRAVITY = 0.0018
const DINO_FRAME_COUNT = 2 // 2 different frame images
const DINO_FRAME_TIME = 100 // Change frame each 100ms
const MAX_DINO_SPEED_SCALE = 1.5

let isJumping, dinoFrame, currentFrameTime, yVelocity

function updateDino(timeDelta, speedScale) {
    handleRun(timeDelta, speedScale)
    handleJump(timeDelta)
}

function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dinoElement, '--bottom', 0)
    document.removeEventListener('keydown', onJump)
    // Remove the event from previous game -> Prevent jump once if we press 'Space' to start new game
    document.addEventListener('keydown', onJump)
}

function handleRun(timeDelta, speedScale) {
    if (isJumping) {
        dinoElement.src = './imgs/dino-stationary.png'
        return
    }

    if (currentFrameTime >= DINO_FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElement.src = `./imgs/dino-run-${dinoFrame}.png`
        currentFrameTime -= DINO_FRAME_TIME
    }
    currentFrameTime += timeDelta * Math.min(speedScale, MAX_DINO_SPEED_SCALE)
}

function handleJump(timeDelta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElement, '--bottom', yVelocity * timeDelta)
    const currentYPosition = getCustomProperty(dinoElement, '--bottom')
    if (currentYPosition <= 0) {
        setCustomProperty(dinoElement, '--bottom', 0)
        isJumping = false
    }
    yVelocity -= GRAVITY * timeDelta
}

function onJump(e) {
    if (e.code !== 'Space' || isJumping) return

    yVelocity = JUMP_SPEED
    isJumping = true
}

function getDinoRect() {
    return dinoElement.getBoundingClientRect()
}

function setDinoLose() {
    dinoElement.src = './imgs/dino-lose.png'
}

export { updateDino, setupDino, getDinoRect, setDinoLose }
