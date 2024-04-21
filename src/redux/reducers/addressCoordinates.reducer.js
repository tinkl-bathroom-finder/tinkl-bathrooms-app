const addressCoordinates = (state = {lat: 44.979225, lng: -93.266945}, action) => {
    if (action.type === 'SET_ADDRESS_COORDINATES') {
        return action.payload
      } else
      return state;
}

export default addressCoordinates;