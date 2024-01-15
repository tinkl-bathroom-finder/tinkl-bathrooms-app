import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

function DeleteBathroomItem({ bathroom }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const goToDetails = () => {
    // maybe add a function to set the details before navigating
    // to the bathroom details page
    history.push(`/bathrooms/${bathroom.id}`);
  };

  const removeBathroomFromDisplay = () => {
    console.log("bathroom.id", bathroom.id);
    dispatch({
      type: "SAGA/DISABLE_BATHROOM",
      payload: bathroom.id,
    });
  };

  const deleteBathroomFromDatabase = () => {
    console.log("bathroom.id", bathroom.id);
    // popup to confirm you are sure you want to delete
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      imageUrl: "https://media.giphy.com/media/LdgRBEyuJ6JNHsFEwF/giphy.gif",
      imageWidth: 250,
      imageHeight: 250,
      imageAlt: "Pink poop",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, flush it!"
    }).then((result) => {
      if (result.isConfirmed) {
    dispatch({
      type: "SAGA/DELETE_BATHROOM",
      payload: bathroom.id
    })
  }})
  };

  return (
    <tr>
      <td>
        <Button onClick={removeBathroomFromDisplay} variant="outlined">Remove from display</Button>
      </td>
      <td>
        <Button onClick={deleteBathroomFromDatabase} variant="outlined">
          Delete from database
        </Button>
      </td>
      <td>{bathroom.name || ""}</td>
      <td>{bathroom.street || ""}</td>
      <td>{bathroom.city || ""}</td>
    </tr>
  );
}

export default DeleteBathroomItem;
