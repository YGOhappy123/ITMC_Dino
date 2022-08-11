function getCustomProperty (element, prop) {
    return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0
}

function setCustomProperty (element, prop, value) {
   element.style.setProperty(prop, value)
}

function incrementCustomProperty (element, prop, increment) {
    const prevValue = getCustomProperty(element, prop)
    const newValue = prevValue + increment
    setCustomProperty(element, prop, newValue)
}

export {
    getCustomProperty,
    setCustomProperty,
    incrementCustomProperty
}