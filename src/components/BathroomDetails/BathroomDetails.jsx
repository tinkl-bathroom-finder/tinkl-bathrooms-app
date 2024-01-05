import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BathroomDetails() {
  // this gets us the bathroom id that exists in the url bar
  const params = useParams();
  const dispatch = useDispatch();
  const theBathroomDetails = useSelector((store) => store.bathroomDetails);
  const history = useHistory();
  useEffect(() => {
    // should log the id of the restroom we're currently on (would expect this to log: {id: '5'} if our browser is at localhost:3000/bathrooms/5)
    console.log("params: ", params);
    // Fire a dispatch that calls a fetchBathroomDetails Saga function
    dispatch({
      type: "SAGA/FETCH_BATHROOM_DETAILS",
      payload: params.id,
    });
    console.log("theBathroomDetails after being fetched: ", theBathroomDetails);
  }, [params.id]); // 👈 useEffect will retrigger if params.id (the id in url) changes

  const returnToList = () => {
    history.push("/bathrooms");
  };

  return (
    <div>
      <h2>{theBathroomDetails.name}</h2>
      <h4>{theBathroomDetails.street}</h4>
      <p>{theBathroomDetails.directions}</p>
      <p>Last updated: {JSON.stringify(theBathroomDetails.updated_at).slice(0, -14)}</p>
      <p>Gender-neutral: {theBathroomDetails.unisex === true ? "yes" : "no"}</p>
      <p>Upvotes: {theBathroomDetails.upvotes}</p>
      <p>Downvotes: {theBathroomDetails.downvotes}</p>
      <h4>Comments:</h4>
      <p>{theBathroomDetails.content}</p>
      <Button onClick={returnToList}>Back to List</Button>
      <br/>
      <br/>
      <Button size="xxl">I peed here!</Button>
    </div>
  );
}

export default BathroomDetails;
