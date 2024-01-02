const bathroomDetails = (state = {}, action) => {
    if (action.type === 'SET_BATHROOM_DETAILS') {
      return action.payload
    } else if (action.type === 'CLEAR_BATHROOM_DETAILS') {
      return {}
    }
    return state
  }

  export default bathroomDetails;