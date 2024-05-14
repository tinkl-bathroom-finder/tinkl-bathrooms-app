const apiBathrooms = (state = [], action) => {
    if (action.type === 'SET_BATHROOMS_GEOCODING') {
        return [...state, action.payload]
    } else
    return state;
}

export default apiBathrooms;