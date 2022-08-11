import { 
    getCustomProperty, 
    setCustomProperty, 
    incrementCustomProperty
} from './updateCurrentProperty.js'

const groundElements = document.querySelectorAll('[data-ground]')

const SPEED = 0.05
function updateGround (timeDelta, speedScale) {
    groundElements.forEach(ground => {
        const increment = timeDelta * SPEED * -1
        incrementCustomProperty(ground, '--left', increment * speedScale)

        const currentPosition = getCustomProperty(ground, '--left')
        if (currentPosition <= -300) {
            incrementCustomProperty(ground, '--left', 600)
        }
    })
}

function setupGround () {
    setCustomProperty(groundElements[0], '--left', 0)
    setCustomProperty(groundElements[1], '--left', 300)
}

export { updateGround, setupGround }