// sets current bathrooms being displayed. Move to its own bathrooms reducer at some point
const bathroomsReducer = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS'){
      return action.payload;
    } return state
  };

export default bathroomsReducer;