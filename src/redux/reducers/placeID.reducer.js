const placeID = (state = "", action) => {
    if (action.type === 'SET_PLACE_ID') {
        return action.payload
      } else
      return state;
}

export default placeID;