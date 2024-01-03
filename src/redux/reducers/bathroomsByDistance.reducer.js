const bathroomsByDistance = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS'){
        console.log('action.payload: ', action.payload)
      return action.payload;
    } return state
  };

export default bathroomsByDistance;