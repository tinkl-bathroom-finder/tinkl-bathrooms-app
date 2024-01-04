const addressCoordinates = (state = {}, action) => {
    if (action.type === 'SET_ADDRESS_COORDINATES') {
        return action.payload
      } else
      return state;
}

export default addressCoordinates;