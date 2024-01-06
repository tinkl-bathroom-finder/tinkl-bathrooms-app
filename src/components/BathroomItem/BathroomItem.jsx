import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


function BathroomItem({ bathroom }) {

  const history = useHistory()

  const goToDetails = () => {
  // maybe add a function to set the details before navigating
  // to the bathroom details page
    history.push(`/bathrooms/${bathroom.id}`)
  }


  return (
  <tr>
      <td><Button onClick={goToDetails}>More info</Button>
      </td>
      <td>{bathroom.name || ''}</td>
      <td>{bathroom.street || ''}</td> 
      <td>{bathroom.city || ''}</td>
      <td>{bathroom.distance ? `${bathroom.distance.toFixed(2)} mi` : ''}</td>
      </tr>)
}


export default BathroomItem
