import { useHistory } from 'react-router-dom';

function BathroomItem({ bathroom }) {

  const history = useHistory()
  const goToDetails = () => {
  // maybe add a function to set the details before navigating
  // to the bike details page
    history.push(`/bathrooms/${bathroom.id}`)
  }


  return (
    <li>
      <button onClick={goToDetails}>More info</button>
      {bathroom.name} {bathroom.street} {bathroom.city}
      {bathroom.street}
    </li>
  )
}


export default BathroomItem
