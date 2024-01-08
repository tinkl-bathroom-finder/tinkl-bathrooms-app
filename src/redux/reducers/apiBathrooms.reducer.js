const apiBathrooms = (state = [], action) => {
    if (action.type === 'SET_API_BATHROOMS') {
        return action.payload
    } else
    return state;
}

export default apiBathrooms;