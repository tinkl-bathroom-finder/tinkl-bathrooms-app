const isPublic = (state = false, action) => {
    if (action.type === 'TOGGLE_PUBLIC'){
        return !state
    // biome-ignore lint/style/noUselessElse: <explanation>
    } else return state
}

export default isPublic;

