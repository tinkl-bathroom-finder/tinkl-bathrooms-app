import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bathroomDetails from "../../redux/reducers/bathroomDetails.reducer";

function BathroomDetails() {
  // this gets us the bathroom id that exists in the url bar
  const params = useParams();
  const dispatch = useDispatch();
  const theBathroomDetails = useSelector((store) => store.bathroomDetails);
  const history = useHistory();
  useEffect(() => {
    // should log the id of the restroom we're currently on
    // (would expect this to log: {id: '5'} if our browser is
    // at localhost:3000/bathrooms/5)
    console.log("params: ", params);

    // Fire a dispatch that calls a fetchBathroomDetails
    // Saga function:
    dispatch({
      type: "SAGA/FETCH_BATHROOM_DETAILS",
      payload: params.id,
    });
    console.log("theBathroomDetails after being fetched: ", theBathroomDetails);
  }, [params.id]); // 👈 The dependency array!

  const returnToList = () => {
    history.push("/bathrooms");
  };

  return (
    <div>
      <h2>{theBathroomDetails.name}</h2>
      <h4>{theBathroomDetails.street}</h4>
      <p>{theBathroomDetails.directions}</p>
      <p>Last updated: {theBathroomDetails.updated_at}</p>
      <p>Gender-neutral: {theBathroomDetails.unisex === true ? "yes" : "no"}</p>
      <p>Upvotes: {theBathroomDetails.upvotes}</p>
      <p>Downvotes: {theBathroomDetails.downvotes}</p>
      <button onClick={returnToList}>Back to List</button>
    </div>
  );
}

export default BathroomDetails;
