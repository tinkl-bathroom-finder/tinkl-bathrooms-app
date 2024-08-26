// sets current bathrooms being displayed
const bathroomsReducer = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS'){
      return action.payload;
     } else if (action.type === 'FILTER_BATHROOMS') {
     return state.filter(bathroom => action.payload !== bathroom.public)
    }  return state
  };



export default bathroomsReducer;