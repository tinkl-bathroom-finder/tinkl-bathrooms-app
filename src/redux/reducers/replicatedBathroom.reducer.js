const replicatedBathroom = (state = null, action) => {
    if (action.type === 'SET_REPLICATED_BATHROOM_DETAILS' && action.payload) {
      return action.payload
    } else if (action.type === 'CLEAR_REPLICATED_BATHROOM_DETAILS') {
      return null
    }
    return state
  }

  export default replicatedBathroom;