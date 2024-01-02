import { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import bathroomDetails from '../../redux/reducers/bathroomDetails.reducer'

function BathroomDetails() {
    // this gets us the bathroom id that exists in the url bar
    const params = useParams()
    const dispatch = useDispatch()
    const theBathroomDetails = useSelector(store => store.bathroomDetails)
    const history = useHistory()
    console.log('theBathroomDetails:', theBathroomDetails)
    useEffect(() => {
        // should log the id of the restroom we're currently on
        // (would expect this to log: {id: '5'} if our browser is
        // at localhost:3000/bikes/5)
        console.log('params: ', params)

    // Fire a dispatch that calls a fetchBathroomDetails
    // Saga function:
    dispatch({
        type: 'SAGA/FETCH_BATHROOM_DETAILS',
        payload: params.id  // 👈 The dependency array!
      })
    }, [])

    const returnToList = () => {
        history.push('/bathrooms')
    }
    return (
        <div>
            <h2>{theBathroomDetails[0].name}</h2>
            <h4>{theBathroomDetails[0].street}</h4>
            <p>{theBathroomDetails[0].directions}</p>
            {/* make back button that returns to list */}
            <button onClick={returnToList}>Back to List</button>
        </div>
    )
}

export default BathroomDetails;