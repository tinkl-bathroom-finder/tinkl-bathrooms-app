const userFeedback = (state = [], action) => {
    if (action.type === 'SET_USER_FEEDBACK_ARRAY') {
      return action.payload
    } return state
  }

  export default userFeedback;