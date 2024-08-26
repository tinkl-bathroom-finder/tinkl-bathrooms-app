const openNow = (state = false, action) => {
    if (action.type === 'TOGGLE_OPEN_NOW'){
        return !state
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else return state
}

export default openNow;