const mapViewReducer = (state = false, action) => {
    if (action.type === 'TOGGLE_VIEW'){
        return !state
    } else return state
}

export default mapViewReducer;