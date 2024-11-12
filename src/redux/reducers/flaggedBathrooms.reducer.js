const flaggedBathrooms = (state = [], action) => {
    if (action.type === 'SET_FLAGGED_BATHROOMS') {
        return action.payload
    }
    return state
}

export default flaggedBathrooms