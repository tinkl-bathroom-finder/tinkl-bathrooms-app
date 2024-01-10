const userComments = (state = [], action) => {
    if (action.type === 'SET_USER_INFO') {
      return action.payload
    } return state
  }

  export default userComments;