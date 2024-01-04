const bathroomsByDistance = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS_BY_DISTANCE'){
        console.log('action.payload: ', action.payload)
      return action.payload;
    } return state
  };

export default bathroomsByDistance;