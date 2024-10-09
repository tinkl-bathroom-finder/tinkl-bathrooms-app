// sets current bathrooms being displayed
const contactReducer = (state = [], action) => {
    if (action.type === 'SET_CONTACT_DATA'){
      return action.payload;
    } return state
  };

export default contactReducer
