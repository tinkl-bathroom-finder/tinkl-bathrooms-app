
// sets current bathrooms being displayed
const bathroomsReducer = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS'){
      return action.payload;
    } return state
  };

export default bathroomsReducer;