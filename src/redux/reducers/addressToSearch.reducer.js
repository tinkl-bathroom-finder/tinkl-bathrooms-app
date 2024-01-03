const addressToSearch = (state = {}, action) => {
    if (action.type === 'SET_ADDRESS_TO_SEARCH') {
        return action.payload
      } else
      return state;
}

export default addressToSearch;