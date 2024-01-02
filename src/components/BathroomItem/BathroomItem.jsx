import { useHistory } from 'react-router-dom';

function BathroomItem({ bathroom }) {

  const history = useHistory()

  const goToDetails = () => {
  // maybe add a function to set the details before navigating
  // to the bathroom details page
    history.push(`/bathrooms/${bathroom.id}`)
  }


  return (
  <tr>
      <td><button onClick={goToDetails}>More info</button>
      </td>
      <td>{bathroom.name}</td>
      <td>{bathroom.street}</td> 
      <td>{bathroom.city}</td>
      </tr>)
}


export default BathroomItem
