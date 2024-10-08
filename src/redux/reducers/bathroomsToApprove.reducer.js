const bathroomsToApproveReducer = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS_TO_APPROVE'){
      return action.payload;
    } return state
  };

export default bathroomsToApproveReducer;