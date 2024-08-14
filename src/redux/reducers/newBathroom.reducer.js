const newBathroom = (state = {}, action) => {
    if (action.type === 'SET_NEW_BATHROOM_DETAILS' && action.payload) {
      return action.payload
    } else if (action.type === 'CLEAR_NEW_BATHROOM_DETAILS') {
      return null
    }
    return state
  }

  export default newBathroom;