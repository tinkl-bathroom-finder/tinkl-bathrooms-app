const mapViewReducer = (state = true, action) => {
    if (action.type === 'TOGGLE_VIEW'){
        return !state
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else return state
}

export default mapViewReducer;